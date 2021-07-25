import logger from '../../services/logger';

export function unCaughtErrorHandler(
  error: Error
): void {
  logger.error(error);
}
