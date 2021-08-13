<script context="module">
	export async function load({ fetch }) {
		console.log('running load function');
		const sentenceApiCall = fetch('http://localhost:1337/sentences');
		const wordsApiCall = fetch('http://localhost:1337/words');
		const response = await Promise.all([sentenceApiCall, wordsApiCall]);
		const data = await Promise.all(response.map((r) => r.json()));

		return {
			props: {
				data
			}
		};
	}
</script>

<script>
	export let data;
	console.log(data);
	const allSentences = data[0].map((sentence) => {
		return {
			firstSentence: sentence.firstSentence,
			secondSentence: sentence.secondSentence
		};
	});
	const allWords = data[1].map((word) => {
		return {
			firstWord: word.firstWord,
			secondWord: word.secondWord
		};
	});
</script>

<div>In learn page</div>
<div>
	{#each allSentences as sentence}
		<div>{sentence.firstSentence}</div>
		<div>{sentence.secondSentence}</div>
	{/each}
	{#each allWords as word}
		<div>{word.firstWord}</div>
		<div>{word.secondWord}</div>
	{/each}
</div>

<style>
</style>
