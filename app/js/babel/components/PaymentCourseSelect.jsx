import React, { useEffect, useRef } from 'react';
import { Observer } from 'mobx-react-lite';
import { paymentStore } from '../stores/';
import { isEmpty, getData } from '../functions/functions';
import { currentRoot } from '../variables';

export const PaymentCourseSelect = () => {
	const coursesUrl = `${currentRoot}/data/paymentCourses.json`;
	const formElementRef = useRef(null);

	useEffect(() => {
		if (isEmpty(paymentStore.data)) {
			getData(coursesUrl, paymentStore);
		}
	}, []);

	const handleClick = e => {
		// TODO: Add handler here for select click
		console.log(paymentStore.data);
	};

	return (
		<div ref={formElementRef} className="form__input form__select payment-form__select payment-form__input">
			<div className="ums-select">
				<button className="ums-select__btn" onClick={handleClick}>
					Нажмите, чтобы выбрать курс
				</button>
				<ul className="ums-select__list">
					<Observer>
						{() => {
							const coursesArr = paymentStore.data.courses;
							let result = false;

							if (coursesArr) {
								result = coursesArr.map(course => {
									const [name, date, place] = course.name.split(', ');

									return (
										<li className="ums-select__list-item" key={course.name}>
											{`${date} – ${name} `}
											<span>{`(${place})`}</span>
										</li>
									);
								});
							}

							return result;
						}}
					</Observer>
				</ul>
			</div>
		</div>
	);
};
