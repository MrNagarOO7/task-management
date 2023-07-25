import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum TaskType {
  TODO = 'todo',
  IN_PROGRESS = 'inprogress',
  COMPLETED = 'completed',
}

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  desc: string;

  @ApiProperty({
    enum: TaskType,
    isArray: true,
    example: Object.values(TaskType),
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(TaskType)
  status: TaskType;
}
