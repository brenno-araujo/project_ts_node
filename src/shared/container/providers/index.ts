import { container } from 'tsyringe';

import StorageProviderInterface from './StorageProvider/models/StorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

container.registerSingleton<StorageProviderInterface>(
  'StorageProvider',
  DiskStorageProvider,
);
