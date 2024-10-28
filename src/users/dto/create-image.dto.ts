import { IsString, IsUrl } from 'class-validator';

export class CreateImageDto {
  @IsUrl()
  @IsString()
  url: string;
}
