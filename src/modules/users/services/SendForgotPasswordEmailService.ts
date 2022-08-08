import { injectable, inject } from 'tsyringe';
import path from 'path';

import UsersRepositoryInterface from '../repositories/UsersRepositoryInterface';
import MailProviderInterface from '../../../shared/container/providers/MailProvider/models/MailProviderInterface';
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

    @inject('MailProviderTest')
    private mailProviderInterface: MailProviderInterface,

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

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProviderInterface.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          url: 'http://localhost:3000/reset_password?token=${token}',
        },
      },
    });
  }
}
