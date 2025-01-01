import { Role } from './role.enum';

export interface IJwtPayload {
  username: string;
  roles: Role[];
}
