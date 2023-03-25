import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public name: string;

  @IsOptional()
  @IsNumber()
  public points: number;
}
