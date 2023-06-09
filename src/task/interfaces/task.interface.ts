import { Status } from '../enums/task.enum';

export interface ITaskQuery {
  title?: string;
  status?: Status;
  data?: Date;
}
