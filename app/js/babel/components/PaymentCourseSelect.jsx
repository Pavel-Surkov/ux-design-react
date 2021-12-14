import React, { useEffect, useRef } from 'react';
import { Observer } from 'mobx-react-lite';
import { paymentStore } from '../stores';
import { getData } from '../functions';
import { postsUrl, courseType, monthTranslation } from '../variables';

export const PaymentCourseSelect = () => {
	const coursesUrl = `${postsUrl}`;

	const formElementRef = useRef(null);
	const selectElementRef = useRef(null);

	useEffect(async () => {
		// Fetches data and sets it in the paymentStore if there is no data
		const posts = await getData(coursesUrl);

		const categories = [15, 1, 2, 4, 5, 99, 121, 124];

		// Sorts data using categories
		const coursePosts = posts.filter(post => {
			for (let el of post.categories) {
				if (categories.indexOf(el) >= 0) {
					return true;
				}
			}

			return false;
		});

		// Sorts data by dates
		const sortedPosts = coursePosts.sort((prevPost, post) => {
			const prevPostStart = prevPost.acf['ums_course_info_start'];
			const prevPostStr = `${prevPostStart.slice(0, 4)}-${prevPostStart.slice(4, 6)}-${prevPostStart.slice(
				6,
				8
			)}`;
			const prevPostDate = new Date(prevPostStr);

			const postDateStr = post.acf['ums_course_info_start'];
			const postStr = `${postDateStr.slice(0, 4)}-${postDateStr.slice(4, 6)}-${postDateStr.slice(6, 8)}`;
			const postDate = new Date(postStr);

			return prevPostDate - postDate;
		});

		paymentStore.setCourses(sortedPosts);
	}, []);

	const handleBtnClick = e => {
		const target = e.target;

		const formEl = formElementRef.current;
		const courseList = target.nextElementSibling;

		target.classList.toggle('ums-select__btn_state-active');
		formEl.classList.toggle('form__select_state-active');
		courseList.classList.toggle('ums-select__list_visibility-open');
	};

	const handleCourseClick = (e, courseId) => {
		const target = e.target;

		const formEl = formElementRef.current;
		const courseSelect = selectElementRef.current;
		const courseList = courseSelect.nextElementSibling;

		// Adds classes to manage select
		target.classList.add('ums-select__list-item_state-active');
		formEl.classList.toggle('form__select_state-active');
		courseList.classList.toggle('ums-select__list_visibility-open');
		courseSelect.classList.toggle('ums-select__btn_state-active');

		// If it's payment of the next stage of a course
		if (courseId === 1) {
			paymentStore.setSelectedCourseData({
				id: 1,
				title: {
					rendered: 'Оплата следующего этапа действующего курса'
				},
				acf: {
					ums_course_info_price: 0,
					ums_course_info_price_sale: 0
				}
			});

			if (paymentStore.currentValues.previousElementItem) {
				const oldCourse = paymentStore.currentValues.previousElementItem;
				oldCourse.classList.remove('ums-select__list-item_state-active');
			}

			paymentStore.setPreviousElementItem(target);
			paymentStore.setSelectedCourseHTML(target.innerHTML);

			courseSelect.innerHTML = target.innerHTML;

			return;
		}

		const coursesArr = paymentStore.courses;
		const selectedCourse = coursesArr.find(course => course.id === courseId);

		courseSelect.innerHTML = target.innerHTML;

		// Sets values that we need to use in payment methods section
		if (paymentStore.currentValues.previousElementItem) {
			const oldCourse = paymentStore.currentValues.previousElementItem;

			oldCourse.classList.remove('ums-select__list-item_state-active');
			paymentStore.setSelectedCourseData(selectedCourse);
			paymentStore.setPreviousElementItem(target);
			paymentStore.setSelectedCourseHTML(target.innerHTML);
		} else {
			paymentStore.setSelectedCourseData(selectedCourse);
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
							<li className="ums-select__list-item" onClick={e => handleCourseClick(e, 1)}>
								Оплата следующего этапа действующего курса
							</li>
							<Observer>
								{() => {
									const coursesArr = paymentStore.courses;
									let result = false;

									if (coursesArr) {
										result = coursesArr.map(course => {
											const courseId = course.id;

											const [name, dateNum, typeNum] = [
												course.title.rendered,
												course.acf['ums_course_info_start'],
												course.acf['ums_course_info_type']
											];
											const type = courseType[typeNum];

											let [month, day] = [dateNum.slice(4, 6), dateNum.slice(6, 8)];

											if (day[0] === '0') {
												day = day[1];
											}

											const date = `${day} ${monthTranslation[month]}`;

											return (
												<li
													className="ums-select__list-item"
													onClick={e => handleCourseClick(e, courseId)}
													key={courseId}
												>
													{`${date} – ${name} `}
													<span>{`(${type})`}</span>
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
