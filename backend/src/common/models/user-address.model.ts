export interface UserAddressModel {
	line1: string;
	line2?: string;
	city: string;
	state: string;
	country: string;
	zip: string;
}

export interface CustomerAddressModel {
	billingAddress: UserAddressModel;
	deliveryAddress: UserAddressModel;
}
