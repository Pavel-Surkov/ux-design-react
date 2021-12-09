import React, { useEffect, useRef } from 'react';
import { Observer } from 'mobx-react-lite';
import { paymentStore } from '../stores/';
import { isEmpty, getData } from '../functions/functions';
import { currentRoot } from '../variables';

export const PaymentCourseSelect = () => {
	const coursesUrl = `${currentRoot}/data/paymentCourses.json`;

	const formElementRef = useRef(null);
	const selectElementRef = useRef(null);

	useEffect(() => {
		if (isEmpty(paymentStore.data)) {
			getData(coursesUrl, paymentStore);
		}
	}, []);

	const handleBtnClick = e => {
		const target = e.target;

		const formEl = formElementRef.current;
		const courseList = target.nextElementSibling;

		target.classList.toggle('ums-select__btn_state-active');
		formEl.classList.toggle('form__select_state-active');
		courseList.classList.toggle('ums-select__list_visibility-open');
	};

	const handleCourseClick = e => {
		const target = e.target;

		const formEl = formElementRef.current;
		const courseSelect = selectElementRef.current;
		const courseList = courseSelect.nextElementSibling;

		target.classList.add('ums-select__list-item_state-active');
		formEl.classList.toggle('form__select_state-active');
		courseList.classList.toggle('ums-select__list_visibility-open');
		courseSelect.classList.toggle('ums-select__btn_state-active');

		if (paymentStore.currentValues.previousElementItem) {
			const oldCourse = paymentStore.currentValues.previousElementItem;

			oldCourse.classList.remove('ums-select__list-item_state-active');
			paymentStore.setPreviousElementItem(target);
			paymentStore.setSelectedCourse(target.innerHTML);
		} else {
			paymentStore.setPreviousElementItem(target);
			paymentStore.setSelectedCourse(target.innerHTML);
		}

		courseSelect.innerHTML = target.innerHTML;
	};

	return (
		<div ref={formElementRef} className="form__input form__select payment-form__select payment-form__input">
			<div className="ums-select">
				<button ref={selectElementRef} className="ums-select__btn" onClick={handleBtnClick}>
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
										<li
											className="ums-select__list-item"
											onClick={handleCourseClick}
											key={course.name}
										>
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
