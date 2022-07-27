import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const authenticate = new AuthenticateUserService(fakeUsersRepository);
    const createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'Brenno',
      email: 'brenno@email.com',
      password: '12345678',
    });

    const response = await authenticate.execute({
      email: 'brenno@email.com',
      password: '12345678',
    });

    expect(response).toHaveProperty('token');
  });
});
