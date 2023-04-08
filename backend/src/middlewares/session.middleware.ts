import { NextFunction, Response } from 'express';

import { RequestExtended, UserModel } from '@/models';
import { UserService } from '@/modules/users/user.service';
import { ErrorManager, getCookiesAsCollection, verifyToken } from '@/utils';

const sessionMiddleware = async (req: RequestExtended, res: Response, next: NextFunction) => {
  try {
    const allCokies = req.headers.cookie as string;

    const cookie = getCookiesAsCollection(allCokies) as { access: string; loggedIn: string };

    if (!cookie.access) {
      return res.status(401).json({ message: 'USER_NOT_AUTHENTICATED' });
    }

    const verifiedToken = await verifyToken(cookie.access);

    const user = (await UserService.findById(verifiedToken.context.user._id)) as UserModel;

    if (!user) {
      return res.status(403).json({ message: 'INVALID_TOKEN' });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    ErrorManager(res, error, 'ERROR_SESSION_MIDDLEWARE');
  }
};

export { sessionMiddleware };
