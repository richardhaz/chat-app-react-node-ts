import { CustomValidator } from 'express-validator';

export const confirmPasswordMatch: CustomValidator = (value, { req }) => {
  if (value !== req.body.password) {
    throw new Error('Password confirmation does not match password');
  }
  return true;
};
