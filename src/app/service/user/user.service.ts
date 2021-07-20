import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';

import { StorageService } from './../storage/storage.service'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private storageService: StorageService, private router: Router) { }

  public async getUser(username: string): Promise<User> {
    return this.storageService.get(username);
  }

  public createUser(user: User) {
    this.digestMessage(user.usuPasswordSHA256).then(digest => {
      user.usuPasswordSHA256 = digest;
      user.createdAt = new Date;
      this.storageService.set(user.usuName, user);
    })
  }

  public updateUser(user: User) {
    this.storageService.remove(user.usuName);
    user.updatedAt = new Date;
    this.storageService.set(user.usuName, user);
  }

  public async digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  public deleteUser(username: string) {
    this.storageService.remove(username);
  }

}
