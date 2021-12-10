import React, { useEffect, useRef } from 'react';
import { Observer } from 'mobx-react-lite';
import { paymentStore } from '../stores';
import { isEmpty, getData } from '../functions';
import { postsUrl } from '../variables';

export const PaymentCourseSelect = () => {
	const coursesUrl = `${postsUrl}`;

	const formElementRef = useRef(null);
	const selectElementRef = useRef(null);

	useEffect(async () => {
		if (isEmpty(paymentStore.data)) {
			// Fetches data and sets it in the paymentStore if there is no data
			const posts = await getData(coursesUrl);

			const categories = [15, 1, 2, 4, 5, 99, 121, 124];

			// Sorts data using categories
			const sortedPosts = posts.filter(post => {
				for (let el of post.categories) {
					if (categories.indexOf(el) >= 0) {
						return true;
					}
				}

				return false;
			});

			// TODO: Think what to do with sorted data
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

	const handleCourseClick = (e, courseName) => {
		const target = e.target;

		const formEl = formElementRef.current;
		const courseSelect = selectElementRef.current;
		const courseList = courseSelect.nextElementSibling;

		const coursesArr = paymentStore.data.courses;
		const selectedCourse = coursesArr.find(course => course.name === courseName);

		// adds classes that are needed
		target.classList.add('ums-select__list-item_state-active');
		formEl.classList.toggle('form__select_state-active');
		courseList.classList.toggle('ums-select__list_visibility-open');
		courseSelect.classList.toggle('ums-select__btn_state-active');

		courseSelect.innerHTML = target.innerHTML;

		// Sets values that we need to use in payment methods section
		if (paymentStore.currentValues.previousElementItem) {
			const oldCourse = paymentStore.currentValues.previousElementItem;

			oldCourse.classList.remove('ums-select__list-item_state-active');
			paymentStore.setSelectedCourse(selectedCourse);
			paymentStore.setPreviousElementItem(target);
			paymentStore.setSelectedCourseHTML(target.innerHTML);
		} else {
			paymentStore.setSelectedCourse(selectedCourse);
			paymentStore.setPreviousElementItem(target);
			paymentStore.setSelectedCourseHTML(target.innerHTML);
		}
	};

	return (
		<section className="payment-form__section">
			<p className="payment-form__section-name">1. Выберите курс</p>
			<div className="payment-form__section-grid">
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

											{
												/* if the data item is not a course item */
											}
											if (!name || !date || !place) {
												return (
													<li
														className="ums-select__list-item"
														onClick={e => handleCourseClick(e, course.name)}
														key={course.name}
													>
														{course.name}
													</li>
												);
											}

											return (
												<li
													className="ums-select__list-item"
													onClick={e => handleCourseClick(e, course.name)}
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
			</div>
		</section>
	);
};
