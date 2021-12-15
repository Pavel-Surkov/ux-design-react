import React, { useState } from 'react';
import { Observer } from 'mobx-react-lite';
import { reaction } from 'mobx';
import { paymentStore } from '../../stores';
import { isEmpty } from '../../functions';

export const Erip = () => {
	let price = 0;

	// TODOS:
	// 1) Think how to manage price (useState is the best option now)
	// 2) Add behavior: after the select triggers and new course sets, we need to
	// close all the 3rd block (remove all 'payment-section_state-active' classes)
	// from methods sections

	return (
		<div className="erip-payment payment-form__section-item">
			<span className="payment-form__section-name">3. Как оплатить через ЕРИП</span>
			<div className="erip-payment__wrapper">
				<div className="erip-payment__price">
					Сумма для оплаты
					<Observer>{() => <span className="erip-payment__price-value">{price} BYN</span>}</Observer>
				</div>
				<div className="erip-payment__grid">
					<div className="promocode b-promocode erip-payment__promocode">
						<label className="toggle-checkbox b-promocode__toggle-button">
							<input type="checkbox" name="promocode-toggle" className="toggle-checkbox__input" />
							<div className="toggle-checkbox__element" />
							<p className="toggle-checkbox__name">У меня есть промокод</p>
						</label>
						<div className="form__input promocode-input payment-form__input b-promocode__input">
							<input
								data-payment="erip"
								type="text"
								className="b-promocode__input-field"
								inputMode="text"
								name="promocode"
							/>
							<span className="form__label">Промокод</span>
							<span role="alert" className="form__error-label">
								Промокод не найден
							</span>
							<button type="button" className="btn promocode-input__btn b-promocode__button">
								Применить
							</button>
						</div>
					</div>
					<div className="payment-options payment-options_d-vertical erip-payment__options">
						<label className="checkbox payment-options__item">
							<input type="checkbox" name="installment-school" className="checkbox__input" />
							<p className="checkbox__name">Рассрочка на 3 месяца от UX Mind School</p>
						</label>
						<label className="checkbox payment-options__item">
							<input type="checkbox" name="sale-school" className="checkbox__input" />
							<p className="checkbox__name">Скидка 10% выпускникам UX Mind School</p>
						</label>
					</div>
				</div>
				<p className="payment-message erip-payment__message">
					<span className="erip-payment__message-note">
						*Скидки по акциям и промокодам не суммируются.
					</span>После внесения платежа, отправьте копию квитанции на&nbsp;<a href="mailto:hello@ux-school.by">hello@ux-school.by</a>
				</p>
				<div className="erip-payment__content">
					<div className="erip-payment__content-wrapper">
						<p>Как найти нас в ЕРИП:</p>
						<ul>
							<li>1. Пункт "Система "Расчет" (ЕРИП)</li>
							<li>2. Образование и развитие</li>
							<li>3. Дополнительное образование и развитие</li>
							<li>4. Тренинги, семинары, консультации</li>
							<li>5. Минск</li>
							<li>6. ИП Колесень И.Г.</li>
							<li>7. Посещение занятий</li>
							<li>8. Ввести ФИО ученика и сумму для оплаты</li>
						</ul>
					</div>
					<figure className="erip-payment__qr-code">
						<img
							data-lazyloaded="1"
							src="https://ux-school.by/wp-content/themes/ux-mind-school/img/qr-code.svg"
							className="erip-payment__qr-code-img litespeed-loaded"
							data-src="https://ux-school.by/wp-content/themes/ux-mind-school/img/qr-code.svg"
							alt="UX Mind School - оплата курсов с помощью ЕРИП"
							data-was-processed="true"
						/>
						<figcaption className="erip-payment__qr-code-note">Код услуги: 4725501</figcaption>
					</figure>
				</div>
			</div>
		</div>
	);
};
