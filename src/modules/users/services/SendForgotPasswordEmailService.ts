import { injectable, inject } from 'tsyringe';

import UsersRepositoryInterface from '../repositories/UsersRepositoryInterface';
import MailProvider from '../../../shared/container/providers/MailProvider/models/MailProvider';
import AppError from '../../../shared/errors/AppError';
import UserTokensRepositoryInterface from '../repositories/UserTokensRepositoryInterface';

interface Request {
  email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,

    @inject('MailProvider')
    private mailProvider: MailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: UserTokensRepositoryInterface,
  ) {}

  public async execute({ email }: Request): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        'Caso exista um usuário com este e-mail, você receberá um e-mail com instruções para recuperar a senha.',
      );
    }

    const { token } = await this.userTokensRepository.generate(user.id);

    await this.mailProvider.sendMail(
      email,
      `Pedido de recuperação de senha recebido: ${token}`,
    );
  }
}
