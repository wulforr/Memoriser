<script>
	export let word;
	import deleteIcon from '$lib/icons/delete.svg';
	import editIcon from '$lib/icons/edit.svg';
</script>

<div class="row">
	<p>
		{word.firstWord}
	</p>
	<div class="actions">
		<img src={editIcon} alt="Edit" />
		<img src={deleteIcon} alt="Delete" />
	</div>
</div>

<style>
	.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.row:hover {
		background-color: rgba(182, 195, 207, 0.2);
	}
	img {
		width: 15px;
	}
	p {
		margin: 0.5rem 0;
	}
</style>
