import { makeObservable, observable, action } from 'mobx';

const createPaymentStore = () => {
	return makeObservable(
		{
			data: {},
			setData(data) {
				this.data = JSON.parse(JSON.stringify(data));
			},
			// For managing state of course select
			currentValues: {
				selectedCourse: null,
				previousElementItem: null
			},
			setSelectedCourse(course) {
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
			setPreviousElementItem: action
		}
	);
};

export const paymentStore = createPaymentStore();
