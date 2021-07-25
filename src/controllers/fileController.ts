import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import conf from '../conf';
import path from 'path';
import md5 from 'md5';
import fs from 'fs';
import { deleteFile, getAllFiles } from '../services/fileService';
import { BadRequestError } from '../middlewares/error/errors';
import { errorHandler } from '../middlewares/error/errorHandler';

const storage = multer.diskStorage({
  destination: function(
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void,
  ) {
    callback(null, `.${conf.filesDirectory}`);
  },
  filename: function(
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, fileName: string) => void,
  ) {
    const extension: string = path.extname(file.originalname);
    const fileName = `${md5(`${Math.ceil(Math.random() * 1000)}${Date.now()}${file.filename}`)}${extension}`;
    const filePath = path.join(__dirname, '../../', conf.filesDirectory, fileName);
    const fileExist: boolean = fs.existsSync(filePath);
    if (fileExist) {
      callback(new BadRequestError('File already exist'), '');
    } else {
      callback(
        null,
        fileName,
      );
    }
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    if (!conf.fileExtensions.includes(path.extname(file.originalname))) {
      return cb(new BadRequestError(`Files accepted are : ${conf.fileExtensions.join(', ')}`));
    }
    cb(null, true);
  },
}).single('file');

const fileController = Router();

fileController.get('/all', (req: Request, res: Response, next: NextFunction) => {
  try {
    const files: string[] = getAllFiles();
    res.status(200).send(files);
  } catch (e) {
    next(e);
  }
})

fileController.post(
  '/',
  upload,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.file) {
        errorHandler(new BadRequestError('No file'), req, res);
      }
      res.status(200).send({ fileName: req.file.filename });
    } catch (e) {
      next(e)
    }
  },
);

fileController.delete(
  '/:filename',
  (req: Request, res: Response, next: NextFunction) => {
    try {
      deleteFile(req.params?.filename);
      res.status(204).send();
    } catch (e) {
      next(e)
    }
  },
);

export default fileController;