export const HASHER_SERVICE = 'HASHER_SERVICE';

export interface HasherService {
  hash(password: string): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
}
