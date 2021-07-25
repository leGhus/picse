import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';
import morgan from 'morgan';
import fileController from './controllers/fileController';
import { unCaughtErrorHandler } from './middlewares/error/standardErrorHandler';
import logger from './services/logger';
import { errorHandler } from './middlewares/error/errorHandler';


/**
 * Load configuration
 */
const NODE_ENV = process.env.NODE_ENV?.trim();
const rootPath = path.join(__dirname, '/..');
if (!NODE_ENV) {
  logger.error('provide NODE_ENV variable in launch script');
  process.exit(1);
}
if (NODE_ENV === 'dev' && fs.existsSync(path.join(rootPath, 'dev.env'))) {
  dotenv.config({ path: path.join(rootPath, 'dev.env') });
} else {
  logger.error('provide dev.env configuration');
  process.exit(1);
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
  app.use(morgan('common'));
}


/**
 * Controllers
 */
app.use(fileController);

/**
 * error handlers
 */
app.use(errorHandler)

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
