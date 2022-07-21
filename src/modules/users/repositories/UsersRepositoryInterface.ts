import User from '../infra/typeorm/entities/User';
import CreateUserDto from '../dtos/CreateUserDto';

export default interface UsersRepositoryInterface {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create(dto: CreateUserDto): Promise<User>;
  save(user: User): Promise<User>;
}
