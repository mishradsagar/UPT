import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { closeInMongodConnection, rootMongooseTestModule } from '../../test/utils/mongoose.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';
import { UpdateUserDTO } from './user.input';

describe('UserService', () => {
  let service: UserService;
  let user: User;
  const sampleUserInfo = {
    'email': 'tempmail1@gmail.com',
    'givenName': 'Alex',
    'familyName': 'T'
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    user = await service.createUser(sampleUserInfo);

    expect(user.id).toEqual(expect.stringMatching(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/));
    expect(user.email).toEqual(sampleUserInfo.email);
    expect(user.givenName).toEqual(sampleUserInfo.givenName);
    expect(user.familyName).toEqual(sampleUserInfo.familyName);
  });

  it('should return a user', async () => {
    const existingUser = await service.getUserById(user.id);

    expect(existingUser.id).toEqual(expect.stringMatching(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/));
    expect(existingUser.email).toEqual(user.email);
    expect(existingUser.givenName).toEqual(user.givenName);
    expect(existingUser.familyName).toEqual(user.familyName);
  });

  it('should return a user by email', async () => {
    const existingUser = await service.getUserByEmail(user.email);

    expect(existingUser.id).toEqual(expect.stringMatching(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/));
    expect(existingUser.email).toEqual(user.email);
    expect(existingUser.givenName).toEqual(user.givenName);
    expect(existingUser.familyName).toEqual(user.familyName);
  });

  it('should update a user', async () => {
    const update: UpdateUserDTO = {
      email: user.email,
      givenName: 'Alexa',
      familyName: 'Turmeric'
    };

    const updatedUser = await service.updateUser(user.id, update);

    expect(updatedUser.givenName).toEqual(update.givenName);
    expect(updatedUser.familyName).toEqual(update.familyName);
  })

  it('should delete a user', async () => {
    const deletedUser = await service.deleteUser(user.id);
    expect(deletedUser.deletedCount).toEqual(1);
    
    const result = await service.getUserById(user.id);
    expect(result).toEqual(null);
  })

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
