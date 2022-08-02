import { container } from 'tsyringe';

import AppointmentsRepositoryInterface from '@modules/appointments/repositories/AppointmentsRepositoryInterface';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import '@modules/users/providers/HashProviderInterface';
import './providers';

import UsersRepositoryInterface from '@modules/users/repositories/UsersRepositoryInterface';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import UserTokensRepositoryInterface from '@modules/users/repositories/UserTokensRepositoryInterface';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<AppointmentsRepositoryInterface>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<UsersRepositoryInterface>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<UserTokensRepositoryInterface>(
  'UserTokensRepository',
  UserTokensRepository,
);
