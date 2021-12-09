import React from 'react';
import { PaymentBreadcrumbs } from './PaymentBreadcrumbs';
import { PaymentTemplate } from './PaymentTemplate';

export const Payment = () => {
	return (
		<main className="main template payment-page pages-template">
			<div className="container">
				<div className="row">
					<div className="col-12">
						{/* TODO: Make query to breadcrumbs DataBase in PaymentBreadcrumbs */}
						<PaymentBreadcrumbs />
						<PaymentTemplate />
					</div>
				</div>
			</div>
		</main>
	);
};
