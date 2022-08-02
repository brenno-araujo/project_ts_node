import UserTokensRepositoryInterface from '../UserTokensRepositoryInterface';
import { uuid } from 'uuidv4';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

export default class FakeUserTokensRepository
  implements UserTokensRepositoryInterface
{
  private UserTokens: UserToken[] = [];

  constructor() {}

  public async generate(user_id: string): Promise<UserToken | undefined> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.UserTokens.push(userToken);

    return userToken || undefined;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const findUserToken = this.UserTokens.find(
      userToken => userToken.token === token,
    );

    return findUserToken || undefined;
  }
}
