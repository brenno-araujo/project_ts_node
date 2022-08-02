import { injectable, inject } from 'tsyringe';

import UsersRepositoryInterface from '../repositories/UsersRepositoryInterface';
import MailProvider from '../../../shared/container/providers/MailProvider/models/MailProvider';
import AppError from '../../../shared/errors/AppError';

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
  ) {}

  public async execute({ email }: Request): Promise<void> {
    const checkEmailExists = await this.usersRepository.findByEmail(email);

    if (!checkEmailExists) {
      throw new AppError(
        'Caso exista um usuário com este e-mail, você receberá um e-mail com instruções para recuperar a senha.',
      );
    }

    this.mailProvider.sendMail(
      email,
      'Pedido de recuperação de senha recebido',
    );
  }
}
