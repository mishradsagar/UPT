import { BadRequestException, Body, ConflictException, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDTO, UserIDDTO } from './user.input';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post()
  async create(@Body() user: CreateUserDto) : Promise<User>{
    try {
      const existingUser = await this.userService.getUserByEmail(user.email);

      if (existingUser) {
        throw new ConflictException(new Error('User with the given email already exists'));
      }

      return this.userService.createUser(user);;
    }
    catch (err) {
      console.log(err);
      return err;
    }
  }

  @Get(':id')
  async getUser(@Param() { id }: UserIDDTO) : Promise<User>{
    try {
      return this.userService.getUserById(id);
    }
    catch (err) {
      console.log(err);
      return err;
    }
  }

  @Put(':id')
  async updateUser(@Param() { id } : UserIDDTO, @Body() user: UpdateUserDTO) : Promise<User>{
    try {
      const existingUser = await this.userService.getUserById(id);

      if (!existingUser) {
        throw new BadRequestException(new Error('User with the given id does not exists.'));
      }

      if (user.email) {
        const userWithSameEmail = await this.userService.getUserByEmail(user.email);

        if (userWithSameEmail && userWithSameEmail.id !== id) {
          throw new ConflictException(new Error('User with the given email already exists'));
        }
      }

      return this.userService.updateUser(id, user);
    }
    catch (err) {
      console.log(err);
      return err;
    }
  }

  @Delete(':id')
  async deleteUser(@Param() { id } : UserIDDTO ) : Promise<User>{
    try {
      const existingUser = await this.userService.getUserById(id);

      if (!existingUser) {
        throw new BadRequestException(new Error('User with the given id does not exists.'));
      }

      const result = await this.userService.deleteUser(id);

      return existingUser;
    }
    catch (err) {
      console.log(err);
      return err;
    }
  }
}
