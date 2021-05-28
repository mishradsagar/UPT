import { Body, ConflictException, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto, GetUserDTO } from './user.input';
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
  async getUser(@Param() { id }: GetUserDTO) : Promise<User>{
    try {
      return this.userService.getUserById(id);
    }
    catch (err) {
      console.log(err);
      return err;
    }
  }
}
