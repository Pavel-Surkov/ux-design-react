import React from 'react';
import ReactDOM from 'react-dom';
import { Payment } from './components/';

const PaymentPage = () => {
	return <Payment />;
};

ReactDOM.render(<PaymentPage />, document.getElementById('payment-root'));

// const Home = () => {
// 	return <Home />;
// };

// ReactDOM.render(<Home />, document.getElementById('home-root'));
