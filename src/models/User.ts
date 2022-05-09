/* eslint-disable no-shadow */
// eslint-disable-next-line import/no-cycle
import { Schedule } from './Schedule';

export interface User {
  id: string;
  email: string;
  name: string;
  role: RoleEnum;
  schedule: [Schedule];
}
// eslint-disable-next-line no-unused-vars
enum RoleEnum {
  // eslint-disable-next-line no-unused-vars
  STUDENT,
  // eslint-disable-next-line no-unused-vars
  TEACHER,
}
