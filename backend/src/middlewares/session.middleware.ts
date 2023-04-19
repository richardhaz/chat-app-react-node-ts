import { NextFunction, Response } from 'express';

import { UserService } from '@modules/users/user.service';
import { RequestExtended, UserModel } from '@models/index';
import { ErrorManager, getCookiesAsCollection, verifyToken } from '@utils/index';

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
