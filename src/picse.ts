import path from 'path';
import morgan from 'morgan';
import express, { Request, Response } from 'express';
import fileController from './controllers/fileController';
import { errorHandler } from './middlewares/error/errorHandler';
import { unCaughtErrorHandler } from './middlewares/error/standardErrorHandler';


/**
 * Express configuration
 */
const picse = express();
picse.use(express.json());
picse.use(express.urlencoded({ extended: true }));
picse.use('/images',
  express.static(path.join(__dirname, '../', '/public/images'), { maxAge: 31557600000 }),
);


/**
 * Acces logs
 */
picse.use(morgan('dev'));


/**
 * Controllers
 */
picse.use(fileController);

/**
 * error handlers
 */
picse.use(errorHandler);

picse.use(function(req: Request, res: Response) {
  res.status(404).send('404 not found');
});

process.on('uncaughtException', function(err) {
  unCaughtErrorHandler(err);
});

/**
 * Launch server
 */
const PORT = process.env.PORT || 8080;
picse.listen(PORT, () => {
  console.info(`Service is running on port ${PORT} in mode`);
  console.info('Press CRTL+C to stop process');
});
