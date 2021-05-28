import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO, UpdateUserDTO } from './user.input';
import { User, UserDocument } from './user.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createUser(user: CreateUserDTO): Promise<User> {
    return this.userModel.create({
      id: uuidv4(),
      created: new Date(),
      ...user
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async getUserById(id: string): Promise<User> {
    return this.userModel.findOne({ id });
  }

  async updateUser(id: string, user: UpdateUserDTO) {
    return this.userModel.findOneAndUpdate({ id }, { $set: { ...user }}, { new: true });
  }

  async deleteUser(id: string) {
    return this.userModel.deleteOne({id});
  }
}
