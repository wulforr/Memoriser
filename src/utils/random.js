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

export const getOptions = (sentence, allWords) => {
	let wordsInSentence = sentence.secondSentence.split(' ');
	const sentenceLength = wordsInSentence.length;
	while (wordsInSentence.length < 6 || wordsInSentence.length < sentenceLength + 2) {
		const word = getRandom(allWords);
		if (!wordsInSentence.includes(word.secondWord)) {
			wordsInSentence.push(word.secondWord);
		}
	}
	wordsInSentence = wordsInSentence.map((ele, index) => {
		return {
			name: ele,
			id: index
		};
	});
	wordsInSentence = shuffleArray(wordsInSentence);
	return wordsInSentence;
};
