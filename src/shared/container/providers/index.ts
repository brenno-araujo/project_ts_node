import { container } from 'tsyringe';

import StorageProviderInterface from './StorageProvider/models/StorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import MailProviderInterface from './MailProvider/models/MailProviderInterface';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

import MailTemplateProviderInterface from './MailTemplateProvider/models/MailTemplateProviderInterface';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<StorageProviderInterface>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<MailTemplateProviderInterface>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<MailProviderInterface>(
  'MailProviderTest',
  container.resolve(EtherealMailProvider),
);
