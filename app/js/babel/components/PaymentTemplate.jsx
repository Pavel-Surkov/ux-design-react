import { PaymentCourseSelect } from './PaymentCourseSelect';

export const PaymentTemplate = () => {
	return (
		<div className="pages-template__grid">
			<h1 className="title title_style-dark template__title payment-page__title">Оплатить курс</h1>
			<div className="row">
				<div className="col-12 col-lg-9">
					<div className="form payment-form">
						<section className="payment-form__section">
							<p className="payment-form__section-name">1. Выберите курс</p>
							<div className="payment-form__section-grid">
								<PaymentCourseSelect />
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
};
