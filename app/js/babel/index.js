import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Comp } from './Comp.jsx';

const Test = () => {
	const [value, setValue] = useState('red');

	const handleClick = () => {
		alert(value);
		setValue('blue');
	};

	return (
		<div>
			<p>Le Go!</p>
			<button onClick={handleClick}>GO!</button>
			<Comp />
		</div>
	);
};

ReactDOM.render(<Test />, document.getElementById('root'));
