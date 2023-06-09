import { Status } from '../enums/task.enum';

export interface IUpdateTask {
  title?: string;
  description?: string;
  status?: Status;
  startDate?: Date;
}
export interface IUpdateSubTask {
  title?: string;
  description?: string;

  status?: Status;
  startDate?: Date;
}
