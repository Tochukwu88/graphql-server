import { Status } from '../enums/task.enum';

export interface ICreateTask {
  title: string;
  description?: string;
  userId: number;
  status: Status;
  startDate: Date;
}
export interface ICreateSubTask {
  title: string;
  description?: string;
  taskId: number;
  status: Status;
  startDate: Date;
}
