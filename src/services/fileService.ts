import fs from 'fs';
import conf from '../conf';
import path from 'path';
import { ProjectError } from '../middlewares/error/errors';

const pathBase = path.join(__dirname, '../../');
const directoryPath = path.join(pathBase, conf.filesDirectory);

export function getAllFiles(): string[] {
  return fs.readdirSync(directoryPath)
    .filter((file: string) => conf.fileExtensions.includes(path.extname(file)));
}

export function deleteFile(fileName: string): void {
  const filePath = path.join(directoryPath, fileName);
  const fileExist: boolean = fs.existsSync(filePath);
  if (!fileExist) {
    throw new ProjectError('Fichier inexistant')
  }
  fs.unlinkSync(filePath);
}