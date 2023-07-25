import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum TaskType {
  ALL = 'all',
  TODO = 'todo',
  IN_PROGRESS = 'inprogress',
  COMPLETED = 'completed',
}

export enum TaskFilterType {
  ALL = 'all',
  MY = 'my',
}

export class FilterTaskDto {
  @ApiProperty({
    enum: TaskType,
    isArray: true,
  })
  @IsEnum(TaskType)
  status: TaskType;

  @ApiProperty({
    enum: TaskFilterType,
    isArray: true,
  })
  @IsEnum(TaskFilterType)
  taskFilter: TaskFilterType;

  @IsNumber()
  @IsNotEmpty()
  pages: number;

  @IsNumber()
  @IsNotEmpty()
  counts: number;

  @ApiHideProperty()
  @IsOptional()
  @IsString()
  userId: string;
}
