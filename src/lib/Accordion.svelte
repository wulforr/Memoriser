<script>
	import { slide } from 'svelte/transition';
	import SentenceRow from '$lib/SentenceRow.svelte';
	import WordRow from '$lib/WordRow.svelte';
	export let data;
	export let header;
	let isOpen = false;
	const toggle = () => (isOpen = !isOpen);
</script>

<button on:click={toggle} aria-expanded={isOpen}
	><svg
		style="tran"
		width="20"
		height="20"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="2"
		viewBox="0 0 24 24"
		stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg
	>
	{header}
</button>
{#if isOpen}
	<ul transition:slide={{ duration: 300 }}>
		{#each data as item}
			{#if item.firstSentence}
				<SentenceRow sentence={item} />
			{:else}
				<WordRow word={item} />
			{/if}
		{/each}
	</ul>
{/if}

<style>
	button {
		border: none;
		background: none;
		display: block;
		color: inherit;
		font-size: 36px;
		cursor: pointer;
		margin: 0;
		padding-bottom: 0.5em;
		padding-top: 0.5em;
	}

	svg {
		transition: transform 0.2s ease-in;
	}

	[aria-expanded='true'] svg {
		transform: rotate(0.25turn);
	}
</style>
