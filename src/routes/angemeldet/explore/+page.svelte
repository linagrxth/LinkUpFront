<script lang="ts">
    import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import { SlideToggle } from '@skeletonlabs/skeleton';
    let tabSet: number = 0;
    let tabsBottomNav = 0;
	let value: boolean = false;
	let checkedValue = false;
	let hashtags = [
    { hashtag: "svelte", count: 10 },
    { hashtag: "javascript", count: 15 },
    { hashtag: "webdevelopment", count: 5 },
	{ hashtag: "svelte", count: 10 },
    { hashtag: "javascript", count: 15 },
    { hashtag: "webdevelopment", count: 5 },
	{ hashtag: "svelte", count: 10 },
    { hashtag: "javascript", count: 15 },
    { hashtag: "webdevelopment", count: 5 },
	{ hashtag: "svelte", count: 10 },
    { hashtag: "javascript", count: 15 },
    { hashtag: "webdevelopment", count: 5 },
	{ hashtag: "svelte", count: 10 },
    { hashtag: "javascript", count: 15 },
    { hashtag: "webdevelopment", count: 5 }
  ];

  import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import {Avatar,} from '@skeletonlabs/skeleton';

	export let posts = writable<{ id: number; user: string; createdAt: string; content: string; isFavorite: boolean; likes: number }[]>([]);
	export let writing = '';
	let id = 1;
	export let user = 'Klara';
	export let createdAt = '12-09-2023';
	export const toggleFavorite = (post: { id: number; user: string; createdAt: string; content: string; isFavorite: boolean; likes: number }) => {
		post.isFavorite = !post.isFavorite;
		if (post.isFavorite) {
			post.likes++;
		} else {
			post.likes--;
		}
		posts.update((value) => [...value]);
	};

	export const handlePost = () => {
		if (writing.trim() !== '') {
			const newPost = {
				id: id++,
				user: user,
				createdAt: createdAt,
				content: writing,
				isFavorite: false,
				likes: 0,
			};
			posts.update((value) => [...value, newPost]);
			writing = '';
		}
	};
</script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<TabGroup
						justify="justify-center"
						active="variant-filled-primary"
						hover="hover:variant-soft-primary"
						flex="flex-1 lg:flex-none"
						rounded=""
						border=""
						class="bg-surface-100-800-token w-full"
					>
						<Tab bind:group={tabsBottomNav} name="beliebt" value={0}>
							<svelte:fragment slot="lead"><i class="fa fa-hand-peace-o" aria-hidden="true"></i></svelte:fragment>
							Beliebt
						</Tab>
						<Tab bind:group={tabsBottomNav} name="aktuell" value={1}>
							<svelte:fragment slot="lead"><i class="fa fa-line-chart" aria-hidden="true"></i></svelte:fragment>
							Top aktuell
						</Tab>
                        <Tab bind:group={tabsBottomNav} name="trends" value={2}>
							<svelte:fragment slot="lead"><i class="fa fa-star" aria-hidden="true"></i></svelte:fragment>
							Neue Trends
						</Tab>

						<svelte:fragment slot="panel">
		{#if tabSet === 0}


		{:else if tabSet === 1}
          <div class = "verantwortlich">
            <br>
			<p>Marc Buddemeier</p>
            <p>Bahnhofstr. 12</p>
            <p>68163 Mannheim</p>
            <br>
            <p>Das ist eine Webseite, die von Studenten innerhalb der Vorlesung "Web-Programmierung" erstellt wurde. <p>
          </div>
		{:else if tabSet === 2}
			
		{/if}
	</svelte:fragment>

					</TabGroup>
<style>



</style>
