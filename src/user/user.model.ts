import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop()
  email: string;

  @Prop()
  givenName: string;

  @Prop()
  familyName: string;

  @Prop()
  created: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);