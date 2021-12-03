import React, { useState } from 'react';
import { Comp } from './Comp.jsx';

const Test = () => {
	const [value, setValue] = useState('red');

	handleClick = () => {
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
