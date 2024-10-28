import { v4 as uuid } from 'uuid';

export const fileNamer = (file: Express.Multer.File) => {
  if (!file) throw new Error('File is Empty');

  return uuid();
};
