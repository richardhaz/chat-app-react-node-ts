import { NextFunction, Response } from 'express';

import { RequestExtended, UserModel } from '@/models';
import { UserService } from '@/modules/users/user.service';
import { ErrorManager, verifyToken } from '@/utils';

const sessionMiddleware = async (req: RequestExtended, res: Response, next: NextFunction) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) return res.status(401).json({ message: 'USER_NOT_AUTHORIZED' });

    const token = bearerToken.split(' ').pop();

    if (!token) return res.status(401).json({ message: 'TOKEN_IS_INVALID' });

    const verifiedToken = await verifyToken(token);

    const user = (await UserService.findById(verifiedToken.context.user._id)) as UserModel;

    if (!user) {
      return res.status(403).json({ message: 'USER_NOT_FOUND_WITH_TOKEN_PROVIDED' });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    ErrorManager(res, error, 'ERROR_SESSION_MIDDLEWARE');
  }
};

export { sessionMiddleware };
