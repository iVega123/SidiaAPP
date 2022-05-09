/* eslint-disable import/no-cycle */
import { User } from './User';

export interface Schedule {
  createdAt: Date;
  updatedAt: Date;
  appointment: Date;
  user: [User];
}
