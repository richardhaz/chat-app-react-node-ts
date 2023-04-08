import { Request, Response } from 'express';

export const routeNotFound = (req: Request, res: Response) => {
  res.status(404).json({
    error: {
      name: 'Error',
      status: 404,
      message: `The path ${req.originalUrl} does NOT EXIST`,
      statusCode: 404,
      stack: 'http://localhost:5050/api',
    },
    message: 'This route does not exist!',
  });
};
