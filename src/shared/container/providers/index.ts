import { container } from 'tsyringe';

import StorageProviderInterface from './StorageProvider/models/StorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import MailProviderInterface from './MailProvider/models/MailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<StorageProviderInterface>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerInstance<MailProviderInterface>(
  'MailProvider',
  new EtherealMailProvider(),
);
