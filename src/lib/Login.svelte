<script>
	export let toggleShowLogin;
	let email = '';
	let password = '';
</script>

<div>
	<h1>Login</h1>
	<input type="email" bind:value={email} placeholder="Enter your email" />
	<input type="password" bind:value={password} placeholder="Enter your password" />
	<button>Login</button>
	<p>Dont have an account? <span on:click={() => toggleShowLogin()}>register</span></p>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
	}

	h1 {
		text-align: center;
	}

	input {
		padding: 0.5rem;
		margin: 1rem 0;
		border-radius: 4px;
	}
	button {
		padding: 0.5rem;
		background-color: var(--button-background);
		margin: 1.25rem 0 0.5rem;
		color: #fff;
		border: 1px solid var(--button-background);
	}
	p {
		text-align: center;
	}
	span {
		color: var(--accent-color);
	}
</style>
