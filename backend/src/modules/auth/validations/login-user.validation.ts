import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';

import { validateResult } from '@/utils';

const login = [
  body('email').exists().withMessage('email is required'),
  body('password').exists().withMessage('password is required'),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export const AuthValidation = { login };
