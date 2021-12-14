import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { paymentStore } from '../../stores';
import { isEmpty } from '../../functions';

export const Erip = observer(() => {
	const [price, setPrice] = useState(0);

	useEffect(
		() => {
			const currentCourse = paymentStore.currentValues.selectedCourseData;

			if (!isEmpty(currentCourse)) {
				const currentPrice = currentCourse.acf['ums_course_info_price'];
				setPrice(currentPrice);
			}
		},
		[paymentStore.currentValues.selectedCourseData]
	);

	// TODO: Write this component

	return (
		<section className="payment-section payment-form__section">
			<div className="erip-payment payment-form__section-item">
				<span className="payment-form__section-name">3. Как оплатить через ЕРИП</span>
				<div className="erip-payment__wrapper">
					<div className="erip-payment__price">
						Сумма для оплаты
						<span className="erip-payment__price-value">{price} BYN</span>
					</div>
					<div className="erip-payment__grid">
						<div className="promocode b-promocode erip-payment__promocode">
							<label className="toggle-checkbox b-promocode__toggle-button">
								<input type="checkbox" name="promocode-toggle" className="toggle-checkbox__input" />
								<div className="toggle-checkbox__element" />
								<p className="toggle-checkbox__name">У меня есть промокод</p>
							</label>
							<div className="form__input promocode-input payment-form__input b-promocode__input" />
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
					</span>После внесения платежа, отправьте копию квитанции на <a href="mailto:hello@ux-school.by">hello@ux-school.by</a>
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
							className="erip-payment__qr-code-img"
							src="<?php echo esc_url( get_template_directory_uri() ); ?>/img/qr-code.svg"
							alt="UX Mind School - оплата курсов с помощью ЕРИП"
						/>
						<figcaption className="erip-payment__qr-code-note">Код услуги: 4725501</figcaption>
					</figure>
				</div>
			</div>
		</section>
	);
});
