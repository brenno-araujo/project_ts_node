import { injectable, inject } from 'tsyringe';
import { differenceInHours } from 'date-fns';

import UsersRepositoryInterface from '../repositories/UsersRepositoryInterface';
import AppError from '../../../shared/errors/AppError';
import UserTokensRepositoryInterface from '../repositories/UserTokensRepositoryInterface';
import HashProviderInterface from '../providers/hashProvider/models/HashProviderInterface';

interface Request {
  password: string;
  token: string;
}

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,

    @inject('UserTokensRepository')
    private userTokensRepository: UserTokensRepositoryInterface,

    @inject('HashProvider')
    private hashProvider: HashProviderInterface,
  ) {}

  public async execute({ password, token }: Request): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token não encontrado');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const tokenCreatedAt = userToken.created_at;

    if (differenceInHours(Date.now(), tokenCreatedAt) > 2) {
      throw new AppError('Token expirado');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}
