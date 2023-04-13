import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';

import { REGEX, validateResult } from '@/utils';

const createMessage = [
  body('message')
    .isString()
    .withMessage('message have to be an string')
    .exists()
    .withMessage('message is required')
    .isLength({ max: 250 })
    .withMessage('min length allowed is 250'),
  body('from').matches(REGEX.MONGO_ID).withMessage('please provide a valid mongoId'),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

const getMessages = [
  body('from').matches(REGEX.MONGO_ID).withMessage('please provide a valid mongoId'),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export const GlobalMessageValidation = { createMessage, getMessages };
