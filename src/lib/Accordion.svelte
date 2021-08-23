<script>
	import { slide } from 'svelte/transition';
	import SentenceRow from '$lib/SentenceRow.svelte';
	import WordRow from '$lib/WordRow.svelte';
	import { getCookie } from '../utils/cookie.js';
	export let data;
	export let header;
	let modalHeading = header === 'All Sentences' ? 'Add Sentence' : 'Add Word';
	let isOpen = false;
	let isModalShown = false;
	let input = '';
	let translatedInput = '';
	let modalBackdropRef;
	const toggleModal = () => (isModalShown = !isModalShown);
	const toggle = () => (isOpen = !isOpen);
	const handleAddNew = () => {
		toggleModal();
	};
	const handleSubmit = async () => {
		toggleModal();
		const BASE_URL = 'https://memoriser-strapiapi.el.r.appspot.com';
		const isSentence = header === 'All Sentences';
		const addUrl = isSentence ? `${BASE_URL}/sentences` : `${BASE_URL}/words`;
		const userInfo = getCookie('userToken');
		const reqBody = isSentence
			? {
					firstSentence: input,
					secondSentence: translatedInput,
					userRef: userInfo.userId
			  }
			: {
					firstWord: input,
					secondWord: translatedInput,
					userRef: userInfo.userId
			  };
		console.log('adding to url', addUrl);
		const response = await fetch(addUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.jwt}` },
			body: JSON.stringify(reqBody)
		});
		console.log('response', response);
	};
	const handleClose = (e) => {
		if (e.target === modalBackdropRef) {
			toggleModal();
		}
	};
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
	<button on:click={handleAddNew}> Add new + </button>
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

<div
	bind:this={modalBackdropRef}
	class={`modal-backdrop ${isModalShown ? '' : 'hidden'}`}
	on:click={handleClose}
>
	<div class="modal">
		<h1>{modalHeading}</h1>
		<input type="text" bind:value={input} placeholder="Enter Value" />
		<input type="text" bind:value={translatedInput} placeholder="Enter Translated Value" />
		<button on:click={handleSubmit}>Submit</button>
	</div>
</div>

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

	.modal-backdrop {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(182, 195, 207, 0.6);
	}

	.modal {
		width: 80vw;
		max-width: 500px;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		padding: 0;
		padding-bottom: 1rem;
	}
	.modal > h1 {
		width: 100%;
		padding: 0.75rem 0.5rem;
		margin-top: 0;
		background-color: #fff;
	}
	.modal > input {
		width: 80%;
		padding: 0.5rem;
		margin: 1.25rem 0;
	}
	.hidden {
		display: none;
	}
	.modal > button {
		margin: 1rem 0;
	}
</style>
