import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';
import { nanoid } from 'nanoid';

export function ensureUploadDir() {
  const dir = process.env.UPLOAD_DIR || 'uploads';
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  return dir;
}

import { Request } from 'express';
import { FileFilterCallback } from 'multer';

export const imageFileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (!file.mimetype.match(/\/image\//)) {
    // FileFilterCallback expects (error: Error | null, accept: boolean)
    return cb(null, false);
  }
  cb(null, true);
};

export function diskStorageConfig() {
  const destination = ensureUploadDir();
  return diskStorage({
    destination,
  filename: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      const unique = nanoid(12);
      cb(null, `${unique}${extname(file.originalname)}`);
    },
  });
}
