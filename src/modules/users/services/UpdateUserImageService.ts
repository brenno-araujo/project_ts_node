import { getRepository } from 'typeorm';
import path from 'path';
import { injectable, inject } from 'tsyringe';

import uploadConfig from '../../../config/upload';
import User from '../infra/typeorm/entities/User';
import fs from 'fs';
import AppError from '../../../shared/errors/AppError';
import UsersRepositoryInterface from '../repositories/UsersRepositoryInterface';
import StorageProviderInterface from '@shared/container/providers/StorageProvider/models/StorageProvider';

interface Request {
  user_id: string;
  image: string;
}

@injectable()
class UpdateUserImageService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,
    @inject('StorageProvider')
    private storageProvider: StorageProviderInterface,
  ) {}

  public async execute({ user_id, image }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    if (user.image) {
      await this.storageProvider.deleteFile(user.image);
    }

    const fileName = await this.storageProvider.saveFile(image);

    user.image = fileName;

    await this.usersRepository.save(user);

    return user;
  }
}
export default UpdateUserImageService;
