import { makeObservable, observable, action } from 'mobx';

const createPaymentStore = () => {
	return makeObservable(
		{
			data: {},
			setData(data) {
				this.data = JSON.parse(JSON.stringify(data));
			}
		},
		{
			data: observable,
			setData: action
		}
	);
};

export const paymentStore = createPaymentStore();
