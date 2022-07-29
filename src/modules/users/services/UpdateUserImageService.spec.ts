import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserImageService from './UpdateUserImageService';
import AppError from '@shared/errors/AppError';

describe('UpdateImage', () => {
  it('should be able to update user image', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserImage = new UpdateUserImageService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Brenno',
      email: 'brenno@email.com',
      password: '12345678',
    });

    await updateUserImage.execute({
      user_id: user.id,
      image: 'avatar.jpg',
    });

    expect(user.image).toBe('avatar.jpg');
  });

  it('should not be able to update user image if user does not exist', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserImage = new UpdateUserImageService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    expect(
      updateUserImage.execute({
        user_id: 'non-existing-user',
        image: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old image when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserImage = new UpdateUserImageService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Brenno',
      email: 'brenno@email.com',
      password: '12345678',
    });

    await updateUserImage.execute({
      user_id: user.id,
      image: 'avatar1.jpg',
    });

    await updateUserImage.execute({
      user_id: user.id,
      image: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar1.jpg');

    expect(user.image).toBe('avatar2.jpg');
  });
});
