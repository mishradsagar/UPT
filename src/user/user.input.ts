import { IsEmail, IsNotEmpty, IsUUID, IsString, IsDate} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  givenName: string;

  @IsString()
  familyName: string;
}