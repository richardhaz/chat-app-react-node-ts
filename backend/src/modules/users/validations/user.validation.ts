import { NextFunction, Request, Response } from 'express';
import { body, param } from 'express-validator';

import { confirmPasswordMatch, IsEmailUnique } from '@/constraints';
import { REGEX, validateResult } from '@/utils';

const registerUser = [
  body('email')
    .isString()
    .withMessage('email have to be an string')
    .isEmail()
    .withMessage('please provide a valid email')
    .exists()
    .withMessage('email is required')
    .normalizeEmail()
    .trim()
    .isLength({ min: 8, max: 120 })
    .withMessage('max length is 8 and min length is 120')
    .custom(IsEmailUnique),
  body('password')
    .isString()
    .withMessage('password have to be an string')
    .exists()
    .withMessage('password is required')
    .isLength({ min: 6, max: 18 })
    .withMessage('max length is 8 and min length is 120'),
  body('confirmPassword')
    .exists()
    .withMessage('confirmPassword is required')
    .custom(confirmPasswordMatch)
    .withMessage('The passwords do not match'),
  body('firstName')
    .isString()
    .withMessage('firstName have to be an string')
    .exists()
    .withMessage('firstName is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('max length is 8 and min length is 120'),
  body('lastName')
    .isString()
    .withMessage('lastName have to be an string')
    .exists()
    .withMessage('lastName is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('max length is 8 and min length is 120'),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

const validateId = [
  param('id').matches(REGEX.MONGO_ID).withMessage('please provide a valid mongoId'),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export const UserValidation = { registerUser, validateId };
