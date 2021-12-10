import { paymentStore } from '../stores';

export const PaymentMethod = () => {
	const currentCourse = paymentStore.currentValues.selectedCourse;

	if (currentCourse) {
		// TODO:
		// 1) Create a sample for each payment method in currentCourse.methods
		// 2) Import them here
		// 3) Output them if there is a suit in currentCourse.methods
	}

	return <section className="payment-form__section">{/*  */}</section>;
};
