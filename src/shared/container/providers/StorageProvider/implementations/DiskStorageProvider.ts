import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import StorageProviderInterface from '../models/StorageProvider';

export default class DiskStorageProvider implements StorageProviderInterface {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, 'uploads', file),
    );
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, 'uploads', file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
