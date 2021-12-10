import { makeObservable, observable, action } from 'mobx';

const createPaymentStore = () => {
	return makeObservable(
		{
			data: {},
			setData(data) {
				this.data = JSON.parse(JSON.stringify(data));
			},
			// For managing state of the course select
			currentValues: {
				selectedCourse: {},
				selectedCourseHTML: null,
				previousElementItem: null
			},
			setSelectedCourse(obj) {
				this.currentValues.selectedCourse = obj;
			},
			setSelectedCourseHTML(course) {
				this.currentValues.selectedCourse = course;
			},
			setPreviousElementItem(el) {
				this.currentValues.previousElementItem = el;
			}
		},
		{
			data: observable,
			setData: action,
			currentValues: observable,
			setSelectedCourse: action,
			setSelectedCourseHTML: action,
			setPreviousElementItem: action
		}
	);
};

export const paymentStore = createPaymentStore();
