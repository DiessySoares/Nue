import { Revenue } from './revenue'
import { Spent } from './spent'

export class User {
    usuName: string;
    usuPasswordSHA256: string;
    usuRandomKeySHA256: string;
    usuEmail: string;

    usuRevenue: Revenue[];
    usuSpent: Spent[];
    
    createdAt: Date;
    updatedAt: Date;
  }