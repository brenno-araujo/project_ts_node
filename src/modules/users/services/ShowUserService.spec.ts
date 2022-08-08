import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowUserService from './ShowUserService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let showUser: ShowUserService;

describe('ShowUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showUser = new ShowUserService(fakeUsersRepository);
  });

  it('should be able show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Brenno',
      email: 'brenno@email.com',
      password: '12345678',
    });

    const profile = await showUser.execute({
      user_id: user.id,
    });

    expect(profile).toHaveProperty('name', 'Brenno');
    expect(profile).toHaveProperty('email', 'brenno@email.com');
  });

  it('should not be able show the profile from non-existing user', async () => {
    await expect(
      showUser.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
