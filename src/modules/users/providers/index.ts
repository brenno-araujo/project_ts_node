import { container } from 'tsyringe';

import HashProviderInterface from './hashProvider/models/HashProviderInterface';
import BCryptHashProvider from './hashProvider/implemetations/BCryptHashProvider';

container.registerSingleton<HashProviderInterface>(
  'HashProvider',
  BCryptHashProvider,
);
