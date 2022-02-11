import { IsString } from 'class-validator';

export class CreateOperationDto {
  @IsString()
  name: string;
}
