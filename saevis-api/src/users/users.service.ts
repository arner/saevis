import { Injectable } from '@nestjs/common';
import {User} from './user.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  public async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({email});
  }

  public async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  public async findOne(id: number): Promise<undefined | User> {
    return await this.userRepository.findOne(id);
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
