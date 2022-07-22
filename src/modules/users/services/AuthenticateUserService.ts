import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import auth from '../../../config/auth';
import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import UsersRepositoryInterface from '../repositories/UsersRepositoryInterface';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }
    if (!(await compare(password, user.password))) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const token = sign({}, auth.jwt.secret, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
