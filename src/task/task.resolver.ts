import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { TaskEntity } from './entities/task.entity';
import { CreateSubTaskInput, CreateTaskInput } from './dto/create-task.input';
import { UpdateSubTaskInput, UpdateTaskInput } from './dto/update-task.input';
import { FindAllTaskInput, FindOneTaskInput } from './dto/find-task.input';
import { TaskResponse } from './dto/task.response';
import { User as CurrentUser } from 'src/auth/user.decorator';
import { UseGuards } from '@nestjs/common';
import { AccessGuard } from 'src/auth/auth.gaurd';

@Resolver(() => TaskEntity)
@UseGuards(AccessGuard)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => TaskResponse)
  async createTask(
    @CurrentUser() user: { userId: number; email: string },
    @Args('createTaskInput')
    createTaskInput: CreateTaskInput,
  ): Promise<TaskResponse> {
    console.log(user);
    await this.taskService.create(createTaskInput, user.userId);
    return { message: 'Task created successfully' };
  }
  @Mutation(() => TaskResponse)
  async createSubTask(
    @Args('createSubTaskInput') createSubTaskInput: CreateSubTaskInput,
  ): Promise<TaskResponse> {
    await this.taskService.createSubtask(createSubTaskInput);
    return { message: 'Task created successfully' };
  }
  @Query(() => [TaskEntity])
  async findAll(
    @CurrentUser() user: { userId: number; email: string },
    @Args('findAllTaskInput') findAllTaskInput: FindAllTaskInput,
  ): Promise<TaskEntity[]> {
    return this.taskService.find(findAllTaskInput, user.userId);
  }

  @Query(() => TaskEntity)
  async findOne(
    @Args('findOneTaskInput') findOneTaskInput: FindOneTaskInput,
  ): Promise<TaskEntity> {
    return this.taskService.findOne(findOneTaskInput);
  }

  @Mutation(() => TaskResponse)
  async updateTask(
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ): Promise<TaskResponse> {
    await this.taskService.updateTask(updateTaskInput);
    return { message: 'Task updated successfully' };
  }
  @Mutation(() => TaskResponse)
  async updateSubTask(
    @Args('updateSubTaskInput') updateSubTaskInput: UpdateSubTaskInput,
  ): Promise<TaskResponse> {
    await this.taskService.updateSubTask(updateSubTaskInput);
    return { message: 'Task updated successfully' };
  }

  @Mutation(() => TaskResponse)
  async removeTask(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<TaskResponse> {
    await this.taskService.deleteTask(id);
    return { message: 'Task deleted successfully' };
  }
  @Mutation(() => TaskResponse)
  async removeSubTask(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<TaskResponse> {
    await this.taskService.deleteSubTask(id);
    return { message: 'Task deleted successfully' };
  }
}
