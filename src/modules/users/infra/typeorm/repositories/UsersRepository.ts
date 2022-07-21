import { getRepository, Repository } from 'typeorm';
import UsersRepositoryInterface from '@modules/users/repositories/UsersRepositoryInterface';
import User from '../entities/User';
import CreateUserDto from '@modules/users/dtos/CreateUserDto';

class UsersRepository implements UsersRepositoryInterface {
  private ormRepository: Repository<User>;

  construtor() {
    this.ormRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user || undefined;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user || undefined;
  }

  public async create(dto: CreateUserDto): Promise<User> {
    const appointment = this.ormRepository.create(dto);

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async save(user: User): Promise<User> {
    await this.ormRepository.save(user);

    return user;
  }
}

export default UsersRepository;
