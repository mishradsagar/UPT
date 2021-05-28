import { BadRequestException, Body, ConflictException, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { CreateUserDTO, UpdateUserDTO, UserIDDTO } from './user.input';
import { User } from './user.model';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiCreatedResponse({ type: User, description: 'User Created' })
  @ApiConflictResponse({ description: 'User with the given email already exists' })
  @Post()
  async create(@Body() user: CreateUserDTO) : Promise<User>{
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

  @ApiOperation({ summary: 'Get User' })
  @ApiOkResponse({ type: User, description: 'Get User Info'})
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

  @ApiOperation({ summary: 'Update User' })
  @ApiOkResponse({ type: User, description: 'Update User Info'})
  @ApiBadRequestResponse({ description: 'User with the given id does not exists.' })
  @ApiConflictResponse({ description: 'User with the given email already exists' })
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

  @ApiOperation({ summary: 'Delete User' })
  @ApiOkResponse({ type: User, description: 'Deleted user info'})
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
