import handlebars from 'handlebars';
import fs from 'fs';

import MailTemplateProviderInterface from '../models/MailTemplateProviderInterface';
import ParseMailTemplateDTO from '../dtos/ParseMailTemplateDTO';

export default class HandlebrasMailTemplateProvider
  implements MailTemplateProviderInterface
{
  public async parse(dto: ParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(dto.file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(dto.variables);
  }
}
