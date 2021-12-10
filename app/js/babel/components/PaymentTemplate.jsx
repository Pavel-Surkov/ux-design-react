import { PaymentCourseSelect } from './PaymentCourseSelect';
import { PaymentMethod } from './PaymentMethod';

export const PaymentTemplate = () => {
	return (
		<div className="pages-template__grid">
			<h1 className="title title_style-dark template__title payment-page__title">Оплатить курс</h1>
			<div className="row">
				<div className="col-12 col-lg-9">
					<div className="form payment-form">
						<PaymentCourseSelect />
						<PaymentMethod />
					</div>
				</div>
			</div>
		</div>
	);
};
