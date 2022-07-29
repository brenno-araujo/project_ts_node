import fs from 'fs';
import StorageProviderInterface from '../models/StorageProvider';

interface Request {
  file: string;
}

export default class FakeStorageProvider implements StorageProviderInterface {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.storage.findIndex(
      storageFile => storageFile === file,
    );

    this.storage.splice(findIndex, 1);
  }
}
