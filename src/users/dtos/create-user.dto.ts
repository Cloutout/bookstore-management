import { Role } from '../../auth/role.enum';

export class CreateUserDto {
  readonly username: string;
  readonly password: string;
  readonly roles: Role[];
}
