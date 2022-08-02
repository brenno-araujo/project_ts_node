import MailProvider from '../models/MailProvider';

interface Messsage {
  to: string;
  body: string;
}

export default class FakeMailProvider implements MailProvider {
  private messages: Messsage[] = [];

  public async sendMail(to: string, body: string): Promise<void> {
    this.messages.push({ to, body });
  }
}
