import { Response } from 'express';

const ErrorManager = (res: Response, error: any, message: string) => {
  console.log(error.message);
  return res.status(500).json({ message });
};

export { ErrorManager };
