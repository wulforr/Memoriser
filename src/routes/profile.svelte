<script context="module">
	export async function load({ session, fetch }) {
		if (session) {
			console.log('running load function in profile');
			const userName = JSON.parse(session.userToken).userName;
			console.log('username', userName);
			const BASE_URL = 'https://memoriser-strapiapi.el.r.appspot.com';
			const sentenceApiCall = fetch(`${BASE_URL}/sentences?userRef.username=${userName}`);
			const wordsApiCall = fetch(`${BASE_URL}/words?userRef.username=${userName}`);
			const response = await Promise.all([sentenceApiCall, wordsApiCall]);
			console.log('response', response);
			const data = await Promise.all(response.map((r) => r.json()));
			return {
				props: {
					userName,
					data
				}
			};
		}
		return {};
	}
</script>

<script>
	import Accordion from '$lib/Accordion.svelte';
	import { deleteCookie } from '../utils/cookie';
	export let userName;
	export let data;
	let showAllWords = false;
	let showAllSentences = false;
	const [allSentences, allWords] = data;
	const handleLogout = () => {
		deleteCookie('userToken');
		window.location = '/';
	};
</script>

<div>
	<h2>Profile Info</h2>
	<button on:click={handleLogout}>Logout</button>
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
