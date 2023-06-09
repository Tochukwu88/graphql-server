import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateSubTaskInput, UpdateTaskInput } from './dto/update-task.input';
import { PrismaService } from 'src/prisma.service';

import { CreateSubTaskInput, CreateTaskInput } from './dto/create-task.input';
import { FindAllTaskInput, FindOneTaskInput } from './dto/find-task.input';
import { TaskEntity } from './entities/task.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async create(payload: CreateTaskInput, userId: number): Promise<void> {
    try {
      await this.prisma.task.create({
        data: {
          title: payload.title,
          description: payload.description,
          startDate: payload.startDate,
          status: payload.status,
          userId: userId,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error('Error occurred contact support');
    }
  }
  async updateTask(payload: UpdateTaskInput): Promise<void> {
    try {
      const cacheKey = `${payload.id}-task`;
      await this.cacheManager.del(cacheKey);
      const task = await this.findOne({ id: payload.id });

      if (!task) {
        throw new NotFoundException('Task not found');
      }
      await this.prisma.task.updateMany({
        where: {
          id: task.id,
        },
        data: {
          title: payload.title || task.title,
          description: payload.description || task.description,

          status: payload.status || task.status,
          completed: payload.completed || task.completed,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error('Error occurred contact support');
    }
  }
  async createSubtask(payload: CreateSubTaskInput): Promise<void> {
    try {
      await this.prisma.subTask.create({
        data: {
          title: payload.title,
          description: payload.description,
          startDate: payload.startDate,
          status: payload.status,
          taskId: payload.taskId,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error('Error occurred contact support');
    }
  }
  async updateSubTask(payload: UpdateSubTaskInput): Promise<void> {
    try {
      const cacheKey = `${payload.id}-subtask`;
      await this.cacheManager.del(cacheKey);
      const task = await this.findOneSubTask({ id: payload.id });
      if (!task) {
        throw new NotFoundException('Task not found');
      }
      await this.prisma.subTask.updateMany({
        where: {
          id: task.id,
        },
        data: {
          title: payload.title || task.title,
          description: payload.description || task.description,

          status: payload.status || task.status,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error('Error occurred contact support');
    }
  }
  async findOne(payload: FindOneTaskInput): Promise<TaskEntity> {
    try {
      const cacheKey = `${payload.id}-task`;
      console.log(cacheKey);

      const cachedPost = await this.cacheManager.get(cacheKey);
      if (cachedPost) {
        const task = JSON.parse(cachedPost);
        console.log(task, 1);
        return task as unknown as TaskEntity;
      }
      const task = await this.prisma.task.findFirst({
        where: {
          id: payload.id,
          deleted: null,
        },
        include: { subTasks: true },
      });

      const cacheValue = JSON.stringify(task);
      await this.cacheManager.set(cacheKey, cacheValue, 1000);
      return task as unknown as TaskEntity;
    } catch (error) {
      console.log(error);
      throw new Error('Error occurred contact support');
    }
  }
  async find(payload: FindAllTaskInput, userId: number): Promise<TaskEntity[]> {
    try {
      const page = payload.page || 1;
      const limit = payload.limit || 10;
      const offset = (page - 1) * limit;

      const whereQuery: any = { userId, deleted: null };
      if (payload.status) {
        whereQuery.status = payload.status;
      }
      if (payload.title) {
        whereQuery.title = {
          contains: `${payload.title}`,
        };
      }
      if (payload.description) {
        whereQuery.description = {
          contains: `${payload.description}`,
        };
      }
      const tasks = await this.prisma.task.findMany({
        where: whereQuery,
        include: { subTasks: true },
        skip: offset,
        take: limit,
      });
      console.log(tasks);
      return tasks as unknown as TaskEntity[];
    } catch (error) {
      console.log(error);
      throw new Error('Error occurred contact support');
    }
  }

  async findOneSubTask(payload: FindOneTaskInput): Promise<TaskEntity> {
    try {
      const cacheKey = `${payload.id}-subtask`;

      console.log(await this.cacheManager.get(cacheKey));
      const cachedPost = await this.cacheManager.get(cacheKey);
      if (cachedPost) {
        const task = JSON.parse(cachedPost);
        return task as unknown as TaskEntity;
      }
      const task = await this.prisma.subTask.findFirst({
        where: {
          id: payload.id,
          deleted: null,
        },
      });
      const cacheValue = JSON.stringify(task);
      await this.cacheManager.set(cacheKey, cacheValue, 1000);
      return task as unknown as TaskEntity;
    } catch (error) {
      console.log(error);
      throw new Error('Error occurred contact support');
    }
  }
  async deleteTask(id: number): Promise<void> {
    try {
      const task = await this.findOne({ id });
      if (!task) {
        throw new NotFoundException('Task not found');
      }
      await this.prisma.task.update({
        where: {
          id: task.id,
        },
        data: {
          deleted: true,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error('Error occurred contact support');
    }
  }
  async deleteSubTask(id: number): Promise<void> {
    try {
      const task = await this.findOne({ id });
      if (!task) {
        throw new NotFoundException('Task not found');
      }
      await this.prisma.subTask.update({
        where: {
          id: task.id,
        },
        data: {
          deleted: true,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error('Error occurred contact support');
    }
  }
}
