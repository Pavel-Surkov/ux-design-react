import React, { useRef } from 'react';
import { paymentStore } from '../stores';
import { reaction } from 'mobx';
import { Erip, AlphaBank, Halva, Bank, Card, Cherepaha } from './paymentMethods';
import { PaymentMethodsList } from './PaymentMethodsList';

export const PaymentMethod = () => {
	const [
		eripSectionRef,
		alphabankSectionRef,
		halvaSectionRef,
		bankSectionRef,
		cardSectionRef,
		cherepahaSectionRef
	] = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

	const availableMethods = {
		erip: eripSectionRef,
		alphabank: alphabankSectionRef,
		halva: halvaSectionRef,
		bank: bankSectionRef,
		card: cardSectionRef,
		cherepaha: cherepahaSectionRef
	};

	// Shows and hides current method's block
	reaction(
		() => paymentStore.paymentMethod, // observable value
		(method, prevMethod) => {
			const currentRef = availableMethods[method];
			const prevRef = availableMethods[prevMethod];

			if (prevMethod) {
				prevRef.current.classList.remove('payment-section_state-active');
			}

			if (currentRef) {
				currentRef.current.classList.add('payment-section_state-active');
			}
		}
	);

	return (
		<section className="payment-form__section">
			<p className="payment-form__section-name">2. Выберите способ оплаты</p>
			<PaymentMethodsList />
			<div id="payment-anchor" />
			<div className="payment-form__content payment-form-list">
				<section ref={eripSectionRef} className="payment-section payment-form__section">
					<Erip />
				</section>
				<section ref={alphabankSectionRef} className="payment-section payment-form__section">
					<AlphaBank />
				</section>
				<section ref={halvaSectionRef} className="payment-section payment-form__section">
					<Halva />
				</section>
				<section ref={bankSectionRef} className="payment-section payment-form__section">
					<Bank />
				</section>
				<section ref={cardSectionRef} className="payment-section payment-form__section">
					<Card />
				</section>
				<section ref={cherepahaSectionRef} className="payment-section payment-form__section">
					<Cherepaha />
				</section>
			</div>
		</section>
	);
};
