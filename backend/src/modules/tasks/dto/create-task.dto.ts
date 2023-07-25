import { ApiHideProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export enum TaskType {
  TODO = 'todo',
  IN_PROGRESS = 'inprogress',
  COMPLETED = 'completed',
}

export class CreateTaskDto {
  @ApiHideProperty()
  @IsOptional()
  @IsString()
  userId: string;

  @ApiHideProperty()
  @IsOptional()
  @IsString()
  taskId: string;

  @IsString()
  title: string;

  @IsString()
  desc: string;

  @ApiHideProperty()
  @IsOptional()
  @IsString()
  status: string;
}
