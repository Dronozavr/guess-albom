import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public name: string;

  @IsOptional()
  public points: number;
}
