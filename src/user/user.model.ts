import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  ApiProperty
} from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({required: true, example: "64fe4d43-4f59-4cd0-8d23-160c4183826d"})
  @Prop()
  id: string;

  @ApiProperty({required: true, example: "harry@hogwarts.com"})
  @Prop()
  email: string;

  @ApiProperty({required: true, example: "Harry"})
  @Prop()
  givenName: string;

  @ApiProperty({required: true, example: "Potter"})
  @Prop()
  familyName: string;

  @ApiProperty({required: true, example: "2021-05-28T13:26:02.163Z"})
  @Prop()
  created: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);