import { makeObservable, observable, action } from 'mobx';

const createPaymentStore = () => {
	return makeObservable(
		{
			courses: [],
			setCourses(data) {
				this.data = this.courses = data;
			},
			// For managing state of the course select
			currentValues: {
				selectedCourseData: {},
				selectedCourseHTML: null,
				previousElementItem: null
			},
			setSelectedCourseData(obj) {
				this.currentValues.selectedCourseData = obj;
			},
			setSelectedCourseHTML(course) {
				this.currentValues.selectedCourseHTML = course;
			},
			setPreviousElementItem(el) {
				this.currentValues.previousElementItem = el;
			},
			// For changing of payment method
			paymentMethod: null,
			setPaymentMethod(method) {
				this.paymentMethod = method;
			}
		},
		{
			courses: observable,
			setCourses: action,
			currentValues: observable,
			setSelectedCourseData: action,
			setSelectedCourseHTML: action,
			setPreviousElementItem: action,
			paymentMethod: observable,
			setPaymentMethod: action
		}
	);
};

export const paymentStore = createPaymentStore();
