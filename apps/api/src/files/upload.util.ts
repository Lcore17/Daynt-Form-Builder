import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';
import { nanoid } from 'nanoid';

export function ensureUploadDir() {
  const dir = process.env.UPLOAD_DIR || 'uploads';
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  return dir;
}

export const imageFileFilter = (_req: any, file: Express.Multer.File, cb: Function) => {
  if (!file.mimetype.match(/\/image\//)) return cb(new Error('Only image files are allowed!'), false);
  cb(null, true);
};

export function diskStorageConfig() {
  const destination = ensureUploadDir();
  return diskStorage({
    destination,
    filename: (_req, file, cb) => {
      const unique = nanoid(12);
      cb(null, `${unique}${extname(file.originalname)}`);
    },
  });
}
