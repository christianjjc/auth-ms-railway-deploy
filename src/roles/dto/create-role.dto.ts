import { Type } from 'class-transformer';
import { IsString, Min, MinLength } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @MinLength(3)
  name: string;

  @Min(0)
  @Type(() => Number)
  level: number;
}
