import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  }),
    it('should be able update user', async () => {
      const user = await fakeUsersRepository.create({
        name: 'Brenno',
        email: 'brenno@email.com',
        password: '12345678',
      });

      const updateUser = await updateProfile.execute({
        user_id: user.id,
        name: 'Brenno',
        email: 'brennonew@email.com',
      });

      expect(updateUser.name).toBe('Brenno');
      expect(updateUser.email).toBe('brennonew@email.com');
    });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Brenno',
      email: 'brenno@email.com',
      password: '12345678',
    });

    const user = await fakeUsersRepository.create({
      name: 'Brenno',
      email: 'test@email.com',
      password: '12345678',
    });

    expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Brenno',
        email: 'brenno@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Brenno',
      email: 'brenno#email.com',
      password: '12345678',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Brenno',
      email: 'brenno#email.com',
      old_password: '12345678',
      password: '12345678',
    });

    expect(updateUser.password).toBe('12345678');
  });

  it('should not be able to update password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Brenno',
      email: 'brenno#email.com',
      password: '12345678',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Brenno',
        email: 'brenno#email.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Brenno',
      email: 'brenno#email.com',
      password: '12345678',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Brenno',
        email: 'brenno#email.com',
        old_password: 'wrong-old-password',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
