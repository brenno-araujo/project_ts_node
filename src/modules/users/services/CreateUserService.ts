import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';
import CreateUserDto from '../dtos/CreateUserDto';
import UsersRepositoryInterface from '../repositories/UsersRepositoryInterface';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,
  ) {}

  public async execute(dto: CreateUserDto): Promise<User> {
    const checkEmailExists = await this.usersRepository.findByEmail(dto.email);

    if (checkEmailExists) {
      throw new AppError('Email already exists');
    }

    const hashedPassword = await hash(dto.password, 8);

    dto.password = hashedPassword;

    const user = await this.usersRepository.create(dto);

    return user;
  }
}
export default CreateUserService;
