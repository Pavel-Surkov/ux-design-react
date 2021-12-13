import { paymentStore } from '../stores';
import { Erip, AlphaBank, Halva, Bank, Card, Cherepaha } from './paymentMethods';

export const PaymentMethod = () => {
	const currentCourse = paymentStore.currentValues.selectedCourse;

	if (currentCourse) {
		// TODO:
		// 1) Create a sample for each payment method in currentCourse.methods
		// 2) Import them here
		// 3) Output them if there is a suit in currentCourse.methods
	}

	return (
		<section className="payment-form__section">
			<p className="payment-form__section-name">2. Выберите способ оплаты</p>
			<div className="payment-form__section-grid payment-form__section-options payment-methods" />
			<div id="payment-anchor" />
			<div className="payment-form__content payment-form-list">
				<Erip />
				<AlphaBank />
				<Halva />
				<Bank />
				<Card />
				<Cherepaha />
			</div>
		</section>
	);
};
