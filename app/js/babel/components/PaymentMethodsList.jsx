import React from 'react';
import { Observer } from 'mobx-react-lite';
import { paymentStore } from '../stores';

export const PaymentMethodsList = () => {
	const handleRadioClick = e => {
		const target = e.target;
		paymentStore.setPaymentMethod(target.dataset.payment);
	};

	return (
		<div className="payment-form__section-grid payment-form__section-options payment-methods">
			<Observer>
				{() => {
					const selectedCourse = paymentStore.currentValues.selectedCourseData;

					let methods = [
						{
							text: 'ЕРИП оплата\u00A0в\u00A03\u00A0этапа',
							value: 'erip'
						},
						{
							text: 'Кредит от\u00A0Альфа\u00A0банка до\u00A012\u00A0месяцев',
							value: 'alphabank'
						},
						{
							text: 'Рассрочка от\u00A02\u00A0до\u00A09\u00A0месяцев по\u00A0карте\u00A0Халва',
							value: 'halva'
						},
						{
							text: 'В\u00A0отделении\u00A0банка',
							value: 'bank'
						},
						{
							text: 'Оплатить\u00A0картой',
							value: 'card'
						},
						{
							text: 'Рассрочка на\u00A08\u00A0месяцев по\u00A0карте\u00A0Черепаха',
							value: 'cherepaha'
						}
					];

					// If it's payment of the next stage of a course
					if (selectedCourse.id === 1) {
						methods = methods.filter(method => (method.value === 'alphabank' ? false : true));
					}

					return methods.map(method => (
						<label className="payment-item payment-form__method" key={method.value}>
							<input
								type="radio"
								name="payment"
								className="payment-item__input"
								data-payment={method.value}
								onClick={handleRadioClick}
							/>
							<p className="payment-item__name">{method.text}</p>
						</label>
					));
				}}
			</Observer>
		</div>
	);
};
