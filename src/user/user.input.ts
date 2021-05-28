import { IsEmail, IsNotEmpty, IsUUID, IsString, IsOptional, IsNotIn } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  givenName: string;

  @IsString()
  @IsNotEmpty()
  familyName: string;
}

export class UserIDDTO {
  @IsUUID()
  id: string;
}

export class UpdateUserDTO {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  givenName: string;

  @IsOptional()
  @IsString()
  familyName: string;
}
