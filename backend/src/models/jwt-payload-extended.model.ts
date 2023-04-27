import { JwtPayload } from 'jsonwebtoken';

export interface JwtPayloadExtendedModel extends JwtPayload {
  context: {
    user: {
      _id: string;
      isPremium: boolean;
      isAdmin: boolean;
    };
  };
  /*   "iat": 1680379941,
  "exp": 1680984741 */
}
