import { IsEmail, IsNotEmpty, IsUUID, IsString, IsDate} from 'class-validator';

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

export class GetUserDTO {
  @IsUUID()
  id: string;
}
