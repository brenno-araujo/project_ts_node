import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import UsersRepositoryInterface from '../repositories/UsersRepositoryInterface';
import User from '../infra/typeorm/entities/User';

interface Request {
  user_id: string;
}

@injectable()
export default class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,
  ) {}

  public async execute({ user_id }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    return this.usersRepository.save(user);
  }
}
