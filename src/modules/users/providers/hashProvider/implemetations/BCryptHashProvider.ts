import HashProviderInterface from '../models/HashProviderInterface';
import { hash, compare } from 'bcryptjs';

export default class BcryptHashProvider implements HashProviderInterface {
  public async generateHash(payload: string): Promise<string> {
    return await hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return await compare(payload, hashed);
  }
}
