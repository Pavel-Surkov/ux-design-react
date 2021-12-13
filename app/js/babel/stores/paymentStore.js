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
			}
		},
		{
			courses: observable,
			setCourses: action,
			currentValues: observable,
			setSelectedCourseData: action,
			setSelectedCourseHTML: action,
			setPreviousElementItem: action
		}
	);
};

export const paymentStore = createPaymentStore();
