import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';

import { REGEX } from '@utils/regex-utility';
import { validateResult } from '@utils/validation-result';

const createConversation = [
  body('lastMessage')
    .isString()
    .withMessage('message have to be an string')
    .exists()
    .withMessage('message is required')
    .isLength({ max: 250 })
    .withMessage('min length allowed is 250'),
  body('member1')
    .exists()
    .withMessage('member1 id is required')
    .matches(REGEX.MONGO_ID)
    .withMessage('please provide a valid mongoId'),
  body('member2')
    .exists()
    .withMessage('member2 id is required')
    .matches(REGEX.MONGO_ID)
    .withMessage('please provide a valid mongoId'),
  body('senderId')
    .exists()
    .withMessage('senderId id is required')
    .matches(REGEX.MONGO_ID)
    .withMessage('please provide a valid mongoId'),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

const findConversationByMembers = [
  body('member1')
    .exists()
    .withMessage('member1 id is required')
    .matches(REGEX.MONGO_ID)
    .withMessage('please provide a valid mongoId'),
  body('member2')
    .exists()
    .withMessage('member2 id is required')
    .matches(REGEX.MONGO_ID)
    .withMessage('please provide a valid mongoId'),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

const findAllMyConversations = [
  body('senderId')
    .exists()
    .withMessage('senderId is required')
    .matches(REGEX.MONGO_ID)
    .withMessage('please provide a valid mongoId'),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

const getConversationById = [
  body('conversationId')
    .exists()
    .withMessage('conversationId is required')
    .matches(REGEX.MONGO_ID)
    .withMessage('please provide a valid mongoId'),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

const updateLastMessageStatus = [
  body('member1')
    .exists()
    .withMessage('member1 is required')
    .matches(REGEX.MONGO_ID)
    .withMessage('please provide a valid mongoId'),
  body('member2')
    .exists()
    .withMessage('member1 is required')
    .matches(REGEX.MONGO_ID)
    .withMessage('please provide a valid mongoId'),
  body('messageStatus')
    .isString()
    .withMessage('messageStatus have to be an string')
    .isIn(['delivered', 'seen'])
    .withMessage('allowed values -> delivered, seen or deleted')
    .exists()
    .withMessage('messageStatus is required')
    .isLength({ max: 250 }),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export const ConversationValidation = {
  createConversation,
  findConversationByMembers,
  findAllMyConversations,
  updateLastMessageStatus,
  getConversationById,
};
