import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './schemas/task.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonResponse, randomString } from '../../utility';
import { FilterTaskDto } from './dto/filter-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}
  async addTask(createTaskDto: CreateTaskDto) {
    try {
      let checkIdExist = true;
      let taskId: string;

      while (checkIdExist) {
        taskId = randomString(8);
        const existTask = await this.taskModel.findOne({ taskId });
        if (!existTask) checkIdExist = false;
      }
      createTaskDto.taskId = taskId;
      createTaskDto.status = createTaskDto?.status
        ? createTaskDto?.status
        : 'todo';
      const respData = (
        await new this.taskModel(createTaskDto).save()
      ).toObject();
      return CommonResponse.getSuccessResponse(respData, 'ADD_TASK', 201);
    } catch (error) {
      return CommonResponse.getFailedResponse(null, null, error);
    }
  }

  async listTask(filterTaskDto: FilterTaskDto) {
    try {
      const taskFilter = filterTaskDto.taskFilter;
      const status = filterTaskDto.status;
      const counts = filterTaskDto.counts || 20;
      const pages = filterTaskDto.pages || 1;
      const skipTotal = counts * (pages - 1);
      const filterCondition = {};
      if (status !== 'all') filterCondition['status'] = status;
      if (taskFilter === 'my') filterCondition['userId'] = filterTaskDto.userId;

      const filteredData = await this.taskModel.aggregate([
        {
          $match: filterCondition,
        },
        {
          $project: {
            taskId: 1,
            title: 1,
            status: 1,
            userId: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
        { $sort: { createdAt: -1 } },
        {
          $skip: skipTotal,
        },
        {
          $limit: +counts,
        },
      ]);
      const total = await this.taskModel.count(filterCondition);
      return CommonResponse.getSuccessResponse(
        { filteredData, total },
        'LIST_TASK',
        201,
      );
    } catch (error) {
      return CommonResponse.getFailedResponse(null, null, error);
    }
  }

  async findOne({ id, userId }) {
    try {
      const existTask = await this.taskModel.findOne({ taskId: id }, null, {
        lean: true,
      });
      if (!existTask) return CommonResponse.getFailedResponse('NO_TASK');
      if (existTask.userId !== userId)
        return CommonResponse.getFailedResponse('NO_ACCESS');
      return CommonResponse.getSuccessResponse(existTask, 'GET_TASK');
    } catch (error) {
      return CommonResponse.getFailedResponse(null, null, error);
    }
  }

  async updateTask(id: string, userId: string, updateTaskDto: UpdateTaskDto) {
    try {
      const existTask = await this.taskModel.findOne({ taskId: id }, null, {
        lean: true,
      });
      if (!existTask) return CommonResponse.getFailedResponse('NO_TASK');
      console.log(updateTaskDto);
      if (existTask.userId !== userId)
        return CommonResponse.getFailedResponse('NO_ACCESS');
      const updateTask = await this.taskModel.findOneAndUpdate(
        { taskId: id },
        updateTaskDto,
        { new: true },
      );
      return CommonResponse.getSuccessResponse(updateTask, 'UPDATE_TASK');
    } catch (error) {
      return CommonResponse.getFailedResponse(null, null, error);
    }
  }

  async removeTask(id: string, userId: string) {
    try {
      const existTask = await this.taskModel.findOne({ taskId: id }, null, {
        lean: true,
      });
      if (!existTask) return CommonResponse.getFailedResponse('NO_TASK');
      if (existTask.userId !== userId)
        return CommonResponse.getFailedResponse('NO_ACCESS');
      const deleteTask = await this.taskModel.findOneAndDelete({ taskId: id });
      return CommonResponse.getSuccessResponse(deleteTask, 'DELETE_TASK');
    } catch (error) {
      return CommonResponse.getFailedResponse(null, null, error);
    }
  }
}
