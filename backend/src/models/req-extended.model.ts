import { Request } from 'express';

import { UserModel } from './user.model';

export interface RequestExtended extends Request {
  user?: UserModel;
  imageName?: string;
  /*   query: {
    searchBy?: string;
    orderBy?: string;
    orderType?: 'desc' | 'asc';
    search?: string;
    limit: string;
    page: string;
    key?: 'firstView';
  }; */
}
