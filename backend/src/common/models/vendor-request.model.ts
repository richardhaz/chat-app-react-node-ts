import { VENDOR_AUTHORIZATION_STATUS } from '@common/constants';

export interface vendorAuthorizationModel {
	vemdorId: string;
	status: VENDOR_AUTHORIZATION_STATUS;
}
