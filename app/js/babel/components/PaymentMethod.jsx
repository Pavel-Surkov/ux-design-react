import React from 'react';
import { paymentStore } from '../stores';
import { Erip, AlphaBank, Halva, Bank, Card, Cherepaha } from './paymentMethods';
import { Observer } from 'mobx-react-lite';
import { PaymentMethodsList } from './PaymentMethodsList';

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
			<PaymentMethodsList />
			<div id="payment-anchor" />
			<div className="payment-form__content payment-form-list">
				<Observer>
					{() => {
						const selectedCourse = paymentStore.currentValues.selectedCourseData;

						// If it's payment of the next stage of a course
						if (selectedCourse.id === 1) {
							return (
								<React.Fragment>
									<Erip />
									<Halva />
									<Bank />
									<Card />
									<Cherepaha />
								</React.Fragment>
							);
						}

						return (
							<React.Fragment>
								<Erip />
								<AlphaBank />
								<Halva />
								<Bank />
								<Card />
								<Cherepaha />
							</React.Fragment>
						);
						// Function that sorts this array if ther
					}}
				</Observer>
			</div>
		</section>
	);
};
