import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import logger from './services/logger';
import fileController from './controllers/fileController';
import { errorHandler } from './middlewares/error/errorHandler';
import { unCaughtErrorHandler } from './middlewares/error/standardErrorHandler';

/**
 * Load configuration
 */
const NODE_ENV = process.env.NODE_ENV?.trim();
const rootPath = path.join(__dirname, '/..');
if (!NODE_ENV) {
  logger.error('provide NODE_ENV variable in launch script');
  process.exit(1);
}

switch (NODE_ENV) {
  case 'dev':
    if (fs.existsSync(path.join(rootPath, 'dev.env'))) {
      dotenv.config({ path: path.join(rootPath, 'dev.env') });
    } else {
      logger.error('provide dev.env configuration');
      process.exit(1);
    }
    break;
  case 'prod':
    if (fs.existsSync(path.join(rootPath, 'prod.env'))) {
      dotenv.config({ path: path.join(rootPath, 'prod.env') });
    } else {
      logger.error('provide prod.env configuration');
      process.exit(1);
    }
    break;
  default :
    if (fs.existsSync(path.join(rootPath, 'dev.env'))) {
      dotenv.config({ path: path.join(rootPath, 'dev.env') });
    } else {
      logger.error('provide dev.env configuration');
      process.exit(1);
    }
    break;
}


/**
 * Express configuration
 */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images',
  express.static(path.join(__dirname, '../', '/public/images'), { maxAge: 31557600000 }),
);


/**
 * Acces logs
 */
if (NODE_ENV === 'dev') {
  app.use(morgan('dev'));
} else if (NODE_ENV === 'prod') {
  const accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), { flags: 'a' })
  app.use(morgan('common', {
    stream: accessLogStream
  }));
}


/**
 * Controllers
 */
app.use(fileController);

/**
 * error handlers
 */
app.use(errorHandler);

app.use(function(req: Request, res: Response) {
  res.status(404).send('404 not found');
});

process.on('uncaughtException', function(err) {
  unCaughtErrorHandler(err);
});

/**
 * Launch server
 */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info(`Service is running on port ${PORT} in mode ${NODE_ENV}`);
  logger.info('Press CRTL+C to stop process');
});
