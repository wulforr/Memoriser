export const getRandom = (data) => {
	const randomIndex = Math.floor(Math.random() * data.length);
	return data[randomIndex];
};

export const shuffleArray = (data) => {
	const array = [...data];
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};
