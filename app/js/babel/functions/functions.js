export function isEmpty(obj) {
	if (Object.keys(obj).length === 0) {
		return true;
	}
	return false;
}

export const getData = async (url, store) => {
	const coursesResponse = await fetch(url);

	if (coursesResponse.ok) {
		const data = await coursesResponse.json();
		store.setData(data);
	} else {
		throw new Error(coursesResponse.status);
	}
};
