import MailProvider from '../models/MailProviderInterface';
import SendMailDTO from '../dtos/SendMailDTO';

interface Messsage {
  to: string;
  body: string;
}

export default class FakeMailProvider implements MailProvider {
  private messages: SendMailDTO[] = [];

  public async sendMail(dto: SendMailDTO): Promise<void> {
    this.messages.push(dto);
  }
}
