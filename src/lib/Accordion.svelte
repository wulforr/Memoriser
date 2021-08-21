<script>
	import { slide } from 'svelte/transition';
	import SentenceRow from '$lib/SentenceRow.svelte';
	import WordRow from '$lib/WordRow.svelte';
	export let data;
	export let header;
	let isOpen = false;
	const toggle = () => (isOpen = !isOpen);
</script>

<div>
	<h1 on:click={toggle} aria-expanded={isOpen}>
		<svg
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
	</h1>
	<button> Add new + </button>
</div>
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
	div {
		background-color: rgba(182, 195, 207, 0.5);
		display: flex;
		justify-content: space-between;
		margin-bottom: 1rem;
		align-items: center;
		padding: 0 1rem;
	}
	h1 {
		font-size: 2rem;
	}
	button {
		background: white;
		display: block;
		color: inherit;
		cursor: pointer;
		margin: 0;
		border: 2px solid var(--button-border);
		padding: 0.5rem 1rem;
		border-radius: 4px;
	}

	svg {
		transition: transform 0.2s ease-in;
	}

	[aria-expanded='true'] svg {
		transform: rotate(0.25turn);
	}
</style>
