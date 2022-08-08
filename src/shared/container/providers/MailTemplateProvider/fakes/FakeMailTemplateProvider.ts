import MailTemplateProviderInterface from '../models/MailTemplateProviderInterface';

export default class FakeMailTemplateProvider
  implements MailTemplateProviderInterface
{
  public async parse(): Promise<string> {
    return 'Mail content';
  }
}
