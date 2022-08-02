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
    });

    this.UserTokens.push(userToken);

    return userToken || undefined;
  }
}
