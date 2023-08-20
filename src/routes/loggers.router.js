import { Router } from 'express';
import { addLogger } from '../utils/logger.js';

const router = Router();

router.get('/', addLogger, (req, res) => {
    req.logger.fatal('This is fatal');
    req.logger.error('This is an error');
    req.logger.warning('This is a warning');
    req.logger.info('This is info');
    req.logger.http('This is http');
    req.logger.debug('This is debug');

    res.send('Route for see loggers');
});

export default router;