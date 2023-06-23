<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
  	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
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


  import { Avatar } from '@skeletonlabs/skeleton';

  let id = 1;
  export let user = 'Klara';
  export let createdAt = '12-09-2023';

  const initialData = [
    {
      id: id++,
      user: user,
      createdAt: createdAt,
      content: 'Das ist der Start',
      isFavorite: false,
      likes: 5,
    }
  ];

  export const posts = writable(initialData);
  export let writing = '';

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

  export const toggleFavorite = (post: { id: number; user: string; createdAt: string; content: string; isFavorite: boolean; likes: number }) => {
		post.isFavorite = !post.isFavorite;
		if (post.isFavorite) {
			post.likes++;
		} else {
			post.likes--;
		}
		posts.update((value) => [...value]);
	};

  onMount(() => {

  });
</script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<TabGroup justify="justify-center" padding="px-10 py-3">
	<Tab bind:group={tabSet} name="tab1" value={0}><strong>Impressum</strong></Tab>
	<Tab bind:group={tabSet} name="tab2" value={1}><strong>Verantwortlichkeit</strong></Tab>
	<Tab bind:group={tabSet} name="tab3" value={2}><strong>Haftungshinweis</strong></Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			<div class="new">
    <div class="card p-4 max-h-[280px] overflow-auto space-y-4" style = "border: 1px solid #b4e2ff;">
		{#each $posts.slice().reverse() as post (post.id)}
	<div class="card p-4 flex flex-col gap-3" style = "border: 1px solid #D8D8D8; margin:10px;" >
		<div class="postheader">
			<Avatar initials={user} background="bg-primary-500" width="w-9" class="mr-4"/>
			<strong style="margin-right: 6vh;">{post.user}</strong> {post.createdAt}
		</div>
		<div class = "inhalt" style="margin-left: 3vh;">&nbsp;{post.content}<br></div>
		<div class="actions">
			<button type="button" class="btn-icon !bg-transparent" on:click={() => toggleFavorite(post)}>
				{#if post.isFavorite}
					<i class="fa fa-heart" aria-hidden="true"></i>
				{:else}
					<i class="fa fa-heart-o" aria-hidden="true"></i>
				{/if}
			</button>
			<h3 class="counter">{post.likes}</h3>
			<button type="button" class="btn-icon !bg-transparent">
				<i class="fa fa-comment-o" aria-hidden="true"></i>
			</button>
		</div>
	</div>
{/each}

</div>
</div>

		{:else if tabSet === 1}
			<div class="new">
    <div class="card p-4 max-h-[280px] overflow-auto space-y-4" style = "border: 1px solid #b4e2ff;">
		{#each $posts.slice().reverse() as post (post.id)}
	<div class="card p-4 flex flex-col gap-3" style = "border: 1px solid #D8D8D8; margin:10px;" >
		<div class="postheader">
			<Avatar initials={user} background="bg-primary-500" width="w-9" class="mr-4"/>
			<strong style="margin-right: 6vh;">{post.user}</strong> {post.createdAt}
		</div>
		<div class = "inhalt" style="margin-left: 3vh;">&nbsp;{post.content}<br></div>
		<div class="actions">
			<button type="button" class="btn-icon !bg-transparent" on:click={() => toggleFavorite(post)}>
				{#if post.isFavorite}
					<i class="fa fa-heart" aria-hidden="true"></i>
				{:else}
					<i class="fa fa-heart-o" aria-hidden="true"></i>
				{/if}
			</button>
			<h3 class="counter">{post.likes}</h3>
			<button type="button" class="btn-icon !bg-transparent">
				<i class="fa fa-comment-o" aria-hidden="true"></i>
			</button>
		</div>
	</div>
{/each}

</div>
</div>
		{:else if tabSet === 2}
		<div class = "tophash">
				<ul>
 		 			{#each hashtags as hashtag, index}
    				<li>{index + 1}. <strong>{hashtag.hashtag}</strong> - Anzahl Posts: {hashtag.count}</li>
  					{/each}
				</ul>
		</div>
		{/if}
	</svelte:fragment>
</TabGroup>
			
			
<style>

	.postheader {
		display: flex;
		text-align: left;
		margin-left: 10px;
	}

	.actions {
		display: flex;
		text-align: left;
	}

	.counter {
		margin-top: 6px;
	}

    .card {
		margin-bottom: 20px; 
        margin: 20px;
	}

	.tophash{
        justify-content: center;
        align-items: left;
        text-align: center;
    }

	.new{
        justify-content: center;
        align-items: left;
        text-align: center;
    }

    .textarea{
         border: 1px solid #D8D8D8;
		border-radius: 10px;
    }

    .inhalt{
        border: 1px solid #E2E8F0 ;
        background-color: #E2E8F0;
		border-radius: 10px;
        margin: 5px;
        height: 60px;
    }



</style>
