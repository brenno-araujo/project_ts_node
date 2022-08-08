import ParseMailTemplateDTO from '../dtos/ParseMailTemplateDTO';

export default interface MailTemplateProviderInterface {
  parse(dto: ParseMailTemplateDTO): Promise<string>;
}
