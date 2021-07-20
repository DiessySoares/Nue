import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public set(key: string, user: User) {
    this._storage?.set(key, user);
  }

  public setText(key: string, text: string) {
    this._storage?.set(key, text);
  }

  public async getText(key: string): Promise<string> {
    return await this._storage.get(key);
  }

  public async get(key: string): Promise<User> {
    return await this._storage.get(key);
  }

  public async remove(key: string) {
    this._storage.remove(key);
  }

}