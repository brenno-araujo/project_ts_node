import { sign } from 'jsonwebtoken';
import auth from '../../../config/auth';
import { injectable, inject } from 'tsyringe';
import HashProviderInterface from '../providers/hashProvider/models/HashProviderInterface';

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

    @inject('HashProvider')
    private hashProvider: HashProviderInterface,
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
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
