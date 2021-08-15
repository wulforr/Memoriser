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
	import { getRandom, getOptions } from '../utils/random.js';
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});
	export let data;
	const allSentences = data[0].map((sentence) => {
		return {
			id: sentence.id,
			firstSentence: sentence.firstSentence,
			secondSentence: sentence.secondSentence
		};
	});
	const allWords = data[1].map((word) => {
		return {
			id: word.id,
			firstWord: word.firstWord,
			secondWord: word.secondWord
		};
	});
	let sentence = getRandom(allSentences);
	let wordsInSentence = getOptions(sentence, allWords);

	let ans = [];
	const handleOptionsWordClick = (word) => {
		ans = [...ans, word];
		wordsInSentence = wordsInSentence.filter((ele) => ele !== word);
	};
	const handleAnsWordClick = (word) => {
		ans = ans.filter((ele) => ele !== word);
		wordsInSentence = [...wordsInSentence, word];
	};
	let isChecked = false;
	let isCorrect = false;
	const checkAns = () => {
		let ansString = ans.map((ele) => ele.name).join(' ');
		if (ansString === sentence.secondSentence) {
			isCorrect = true;
		}
		isChecked = true;
	};

	const handleNext = () => {
		sentence = getRandom(allSentences);
		wordsInSentence = getOptions(sentence, allWords);
		ans = [];
		isCorrect = false;
		isChecked = false;
	};
</script>

<section>
	<h2>{sentence.firstSentence}</h2>
	<div class="selected">
		{#each ans as wordObj (wordObj.id)}
			<div
				in:receive={{ key: wordObj.id }}
				out:send={{ key: wordObj.id }}
				animate:flip={{ duration: 200 }}
				on:click={() => handleAnsWordClick(wordObj)}
			>
				{wordObj.name}
			</div>
		{/each}
	</div>
	<div class="options">
		{#each wordsInSentence as wordObj (wordObj.id)}
			<div
				in:receive={{ key: wordObj.id }}
				out:send={{ key: wordObj.id }}
				animate:flip={{ duration: 200 }}
				on:click={() => handleOptionsWordClick(wordObj)}
			>
				{wordObj.name}
			</div>
		{/each}
	</div>
	<button on:click={checkAns}>Check</button>
	{#if isChecked}
		{#if isCorrect}
			<div class="correctAns">Congratulations! Correct Answer</div>
		{:else}
			<div class="wrongAns">
				Oops Wrong Answer, The correct answer is - {sentence.secondSentence}
			</div>
		{/if}

		<button on:click={handleNext}>Next</button>
	{/if}
</section>

<style>
	section {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	h2 {
		font-size: 1.5rem;
		color: #333;
	}
	.selected {
		display: flex;
		flex-wrap: wrap;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		height: 68px;
		box-sizing: border-box;
		width: 80%;
	}
	.options {
		display: flex;
		flex-wrap: wrap;
	}
	.selected > div,
	.options > div {
		padding: 0.75rem;
		background-color: #333;
		color: #fff;
		margin: 0.75rem;
		border-radius: 4px;
	}
	.correctAns {
		color: green;
	}
	.wrongAns {
		color: red;
	}
</style>
