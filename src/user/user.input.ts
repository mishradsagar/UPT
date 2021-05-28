import { IsEmail, IsNotEmpty, IsUUID, IsString, IsOptional, IsNotIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({required: false, example: "harry@hogwarts.com"})
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({required: false, example: "Harry"})
  @IsString()
  @IsNotEmpty()
  givenName: string;


  @ApiProperty({required: false, example: "Potter"})
  @IsString()
  @IsNotEmpty()
  familyName: string;
}

export class UserIDDTO {
  @ApiProperty({required: true})
  @IsUUID()
  id: string;
}

export class UpdateUserDTO {
  @ApiProperty({required: false, example: "tempmail@gmail.com"})
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({required: false, example: "Harry"})
  @IsOptional()
  @IsString()
  givenName: string;

  @ApiProperty({required: false, example: "Almost Weasley"})
  @IsOptional()
  @IsString()
  familyName: string;
}
