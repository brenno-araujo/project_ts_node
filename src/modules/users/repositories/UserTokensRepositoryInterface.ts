import UserToken from '../infra/typeorm/entities/UserToken';

export default interface UserTokensRepositoryInterface {
  generate(user_id: string): Promise<UserToken | undefined>;
}
