import { IsString, IsUUID, MinLength } from 'class-validator';

export class UserRoleDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  @MinLength(3)
  name: string;
}
