import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

import { User, UserDocument } from './schemas/user.schema';
import { CommonResponse, randomString } from '../../utility';
import { CreateUserDto, LoginUserDto } from './dto';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      let checkIdExist = true;
      let userId: string;
      const existEmailUser = await this.userModel.findOne({
        email: createUserDto.email,
      });
      if (existEmailUser) return CommonResponse.getFailedResponse('USER_EXIST');
      while (checkIdExist) {
        userId = randomString(8);
        const existUser = await this.userModel.findOne({ userId });
        if (!existUser) checkIdExist = false;
      }
      createUserDto.userId = userId;
      const respData = (
        await new this.userModel(createUserDto).save()
      ).toObject();
      delete respData.password;
      return CommonResponse.getSuccessResponse(respData, 'SIGN_UP', 201);
    } catch (error) {
      return CommonResponse.getFailedResponse(null, null, error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const userExist = await this.userModel.findOne(
      { email: loginUserDto.email },
      null,
      { lean: true },
    );

    if (!userExist) return CommonResponse.getFailedResponse('NO_USER');

    const validPassword = await bcrypt.compare(
      loginUserDto.password,
      userExist.password,
    );

    const payload = { userId: userExist.userId, email: userExist.email };
    const accessToken = await this.jwtService.sign(payload);
    if (!validPassword)
      return CommonResponse.getFailedResponse('PASSWORD_INCORRECT');
    return CommonResponse.getSuccessResponse(
      {
        email: userExist.email,
        userId: userExist.userId,
        accessToken,
        fname: userExist.fname,
        lname: userExist.lname,
      },
      'SIGN_IN',
      201,
    );
  }
}
