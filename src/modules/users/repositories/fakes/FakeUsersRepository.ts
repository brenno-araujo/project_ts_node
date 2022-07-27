import UsersRepositoryInterface from '@modules/users/repositories/UsersRepositoryInterface';
import User from '@modules/users/infra/typeorm/entities/User';
import CreateUserDto from '@modules/users/dtos/CreateUserDto';
import { uuid } from 'uuidv4';

class FakeUsersRepository implements UsersRepositoryInterface {
  private users: User[] = [];

  constructor() {}

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser || undefined;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser || undefined;
  }

  public async create(dto: CreateUserDto): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, dto);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
