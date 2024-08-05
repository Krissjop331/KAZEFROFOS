import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  findOne(username: string): Promise<User> {
    return this.userModel.findOne({ where: { username } });
  }

  create(user: Partial<User>): Promise<User> {
    return this.userModel.create(user);
  }
}