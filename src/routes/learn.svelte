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
	import { getRandom, shuffleArray } from '../utils/random.js';
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
	const sentence = getRandom(allSentences);
	let wordsInSentence = sentence.secondSentence.split(' ');
	while (wordsInSentence.length < 6) {
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
	let ans = [];
	const handleOptionsWordClick = (word) => {
		ans = [...ans, word];
		wordsInSentence = wordsInSentence.filter((ele) => ele !== word);
	};
	const handleAnsWordClick = (word) => {
		ans = ans.filter((ele) => ele !== word);
		wordsInSentence = [...wordsInSentence, word];
	};
</script>

<section>
	<h2>{sentence.firstSentence}</h2>
	<p>Translate this by choosing from below</p>
	<div class="selected">
		The answer is
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
	}
	.options {
		display: flex;
		flex-wrap: wrap;
	}
	.selected > div,
	.options > div {
		padding: 0.5rem;
		background-color: #333;
		color: #fff;
		margin: 0.5rem;
	}
</style>
