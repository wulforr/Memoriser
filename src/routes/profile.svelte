<script context="module">
	export async function load({ session, fetch }) {
		if (session) {
			const BASE_URL = 'https://memoriser-strapiapi.el.r.appspot.com';
			console.log('running load function in profile');
			const sentenceApiCall = fetch(`${BASE_URL}/sentences`);
			const wordsApiCall = fetch(`${BASE_URL}/words`);
			const response = await Promise.all([sentenceApiCall, wordsApiCall]);
			// console.log('response', response);
			const data = await Promise.all(response.map((r) => r.json()));
			return {
				props: {
					userName: JSON.parse(session.userToken).userName,
					data: data
				}
			};
		}
		return {};
	}
</script>

<script>
	import Accordion from '$lib/Accordion.svelte';
	export let userName;
	export let data;
	let showAllWords = false;
	let showAllSentences = false;
	const [allSentences, allWords] = data;
</script>

<div>
	<h2>Profile Info</h2>
	<p>Username = {userName}</p>
	<Accordion data={allSentences} header="All Sentences" />
	<Accordion data={allWords} header="All Words" />
	<!-- <h2>All Sentences</h2>
	<ul>
		{#each allSentences as sentence}
			<SentenceRow {sentence} />
		{/each}
	</ul>
	<h2>All words</h2>
	<ul>
		{#each allWords as word}
			<WordRow {word} />
		{/each}
	</ul> -->
</div>
