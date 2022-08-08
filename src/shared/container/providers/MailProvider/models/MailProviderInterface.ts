import SendMailDTO from '../dtos/SendMailDTO';

export default interface MailProviderInterface {
  sendMail(dto: SendMailDTO): Promise<void>;
}
