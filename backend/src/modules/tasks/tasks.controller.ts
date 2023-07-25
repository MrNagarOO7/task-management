import {
  Controller,
  UseGuards,
  Request,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskGuard } from './task.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FilterTaskDto } from './dto/filter-task.dto';

@ApiBearerAuth()
@Controller('tasks')
@UseGuards(TaskGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Request() req, @Body() createTaskDto: CreateTaskDto) {
    const userId = req.user.userId;
    createTaskDto.userId = userId;
    console.log(createTaskDto, req.user);
    return this.tasksService.addTask(createTaskDto);
  }

  @Get()
  list(@Request() req, @Query() filterTaskDto: FilterTaskDto) {
    const userId = req.user.userId;
    filterTaskDto.userId = userId;
    return this.tasksService.listTask(filterTaskDto);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    const userId = req.user.userId;
    return this.tasksService.findOne({ userId, id });
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const userId = req.user.userId;
    return this.tasksService.updateTask(id, userId, updateTaskDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    const userId = req.user.userId;
    return this.tasksService.removeTask(id, userId);
  }
}
