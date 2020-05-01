<script>
	import { onMount } from "svelte";
	import TestWorker from "web-worker:~/modules/test.worker";
	import { waitFor, checkResponse } from "~/modules/fetching.js";

	let worker, workerResponse, textPromise;
	const fetchDelay = 2000;

	onMount(async () => {
		// Create and query worker
		worker = new TestWorker();
		worker.addEventListener("message", function (evt) {
			console.log(`Client got: ${evt.data}`);
			workerResponse = evt.data;
		});
		worker.postMessage("Sending message to worker");

		// Fetch text from file after n milliseconds
		textPromise = waitFor(fetchDelay)
			.then(() => fetch("./lorem.txt"))
			.then(checkResponse)
			.then(result => result.text());
	});
</script>

<style type="text/scss">
	// Import and use set-colors mixin from src/scss/_shared.scss
	@import "shared";
	$title:("text":white, "background":darkslateblue);
	
	section { 
		margin:2rem;
	}
	
	h1 {
		padding:2rem;
		@include set-colors($title);
	}

	.error {
		color:red;
	}
</style>

<h1>Title using Sass mapped colours</h1>

<section>
	<h2>Web workers</h2>
	{#if workerResponse}
		<p>Worker responded with "{workerResponse}"</p>
	{:else}
		<p>Waiting for worker response</p>
	{/if}
</section>

<section>
	<h2>Promises</h2>
	{#if textPromise}
		{#await textPromise}
			<p>Fetching text in {fetchDelay} milliseconds</p>
		{:then text}
			<p>{text}</p>
		{:catch error}
			<p class="error">There was an issue loading the data: {error.status} {error.message}</p>
		{/await}
	{/if}
</section>
