<script lang="ts">
    import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import {Avatar,} from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	import { writable } from 'svelte/store';


	export let tabSet: number = 0;
	export let user = 'Klara';
	export let postcount = '1';
	export let followercount = '5';
	export let followedcount = '10';
	export let bio = 'good vibes';
	let id = 1;
	export let isFavorite = false;
	export let likes = writable(0);

	export const handleTabChange = (event: CustomEvent<number>) => {
    tabSet = event.detail;
  };
	
    export const toggleFavorite = () => {
    isFavorite = !isFavorite;
	if (isFavorite) {
		likes.update((value) => value +1)
	} else {
		likes.update((value) => value - 1);
	}
    };	

	onMount(() => {
    
  });

  export const removeItem = (index: number) => {
		// Entferne den Listeneintrag mit dem angegebenen Index
		// Hier kannst du die entsprechende Logik zum Entfernen des Listeneintrags implementieren
	};
</script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<div class="user">
	<Avatar initials={user} background="bg-primary-500" />
	<div class="user-info">
		<span>Klara Kulinna</span>
		
	</div>
	
</div>
	<div style="margin-top: 3vh; margin-bottom: 3vh;">{bio}</div>
	<div class="counts">
		<span><span class="count">{postcount}</span>Posts</span>
  		<span><span class="count">{followercount}</span>Followers</span>
  		<span><span class="count">{followedcount}</span>Followed</span>
	</div>
	<button type="button" class="btn btn-sm variant-ghost-primary self-end">Profil bearbeiten</button>
	<br><br>
<div class="Tabs">


    
<TabGroup justify="justify-center" padding="px-20 py-3" on:change={handleTabChange}>
	<Tab bind:group={tabSet} name="tab1" value={0}>Posts</Tab>
	<Tab bind:group={tabSet} name="tab2" value={1}>Followers</Tab>
	<Tab bind:group={tabSet} name="tab3" value={2}>Following</Tab>
	<Tab bind:group={tabSet} name="tab4" value={3}>Likes</Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">

		{#if tabSet == 0}	

					<dialog
				bind:this={dialog}
				on:close={() => (showModal = false)}
				on:click|self={() => dialog.close()}
				class="modal">

			<div class="modal-body">
			<!--Anzeige-->
				<div class="card p-4 max-h-[300px] overflow-auto space-y-4">
				{#each $comments.slice().reverse() as comment (comment.id)}
				<div class="flex items-center">
					<Avatar initials={user} background="bg-primary-500" width="w-9" class="mr-4"/>
					<div class = "inhaltComments" style="margin-left: 1vh; width: 80vh;">&nbsp;{comment.content}<br></div>      
				</div>
				{/each}	
			</div>

			</dialog>

		<div class="card p-4 max-h-[480px] overflow-auto space-y-4" style = "border: 1px solid #b4e2ff;">
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
				<button type="button" class="btn-icon !bg-transparent" on:click={openModal}>
					<i class="fa fa-comment-o" aria-hidden="true"></i>
				</button>
			</div>
			</div>
			{/each}
			</div>

		{:else if tabSet == 1}

			<div class="centered-content">
				<div class="card p-4" style="width: 50vh;">
					<nav class="list-nav">
						<ul>
							<li>
								<a href="/?">
									<Avatar initials="LI" background="bg-primary-500" width="w-10" />
									<span class="flex-auto">Lina Groth</span>
									<button type="button" class="btn-icon variant-ghost-warning"><i class="fa fa-times" aria-hidden="true"></i></button>
								</a>
							</li>
							<li>
								<a href="/?">
									<Avatar initials="MA" background="bg-primary-500" width="w-10" />
									<span class="flex-auto">Marc Buddemeier</span>
									<button type="button" class="btn-icon variant-ghost-warning"><i class="fa fa-times" aria-hidden="true"></i></button>
								</a>
							</li>
							<li>
								<a href="/?">
									<Avatar initials="JE" background="bg-primary-500" width="w-10" />
									<span class="flex-auto">Jenny</span>
									<button type="button" class="btn-icon variant-ghost-warning"><i class="fa fa-times" aria-hidden="true"></i></button>
								</a>
							</li>
							<li>
								<a href="/?">
									<Avatar initials="MA" background="bg-primary-500" width="w-10" />
									<span class="flex-auto">Marc Buddemeier</span>
									<button type="button" class="btn-icon variant-ghost-warning"><i class="fa fa-times" aria-hidden="true"></i></button>
								</a>
							</li>
							<li>
								<a href="/?">
									<Avatar initials="MA" background="bg-primary-500" width="w-10" />
									<span class="flex-auto">Marc Buddemeier</span>
									<button type="button" class="btn-icon variant-ghost-warning"><i class="fa fa-times" aria-hidden="true"></i></button>
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>

		{:else if tabSet == 2}
		<div class="centered-content">
			<div class="card p-4" style="width: 50vh;">
				<nav class="list-nav">
					<ul>
						<li>
							<a href="/?">
								<Avatar initials="LI" background="bg-primary-500" width="w-10" />
								<span class="flex-auto">Lina Groth</span>
								<button type="button" class="btn-icon variant-ghost-warning"><i class="fa fa-times" aria-hidden="true"></i></button>
							</a>
						</li>
						<li>
							<a href="/?">
								<Avatar initials="MA" background="bg-primary-500" width="w-10" />
								<span class="flex-auto">Marc Buddemeier</span>
								<button type="button" class="btn-icon variant-ghost-warning"><i class="fa fa-times" aria-hidden="true"></i></button>
							</a>
						</li>
						<li>
							<a href="/?">
								<Avatar initials="JE" background="bg-primary-500" width="w-10" />
								<span class="flex-auto">Jenny</span>
								<button type="button" class="btn-icon variant-ghost-warning"><i class="fa fa-times" aria-hidden="true"></i></button>
							</a>
						</li>
						<li>
							<a href="/?">
								<Avatar initials="MA" background="bg-primary-500" width="w-10" />
								<span class="flex-auto">Marc Buddemeier</span>
								<button type="button" class="btn-icon variant-ghost-warning"><i class="fa fa-times" aria-hidden="true"></i>/button>
							</a>
						</li>
						<li>
							<a href="/?">
								<Avatar initials="MA" background="bg-primary-500" width="w-10" />
								<span class="flex-auto">Marc Buddemeier</span>
								<button type="button" class="btn-icon variant-ghost-warning"><i class="fa fa-times" aria-hidden="true"></i></button>
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>

		{:else if tabSet == 3}
		<dialog
				bind:this={dialog}
				on:close={() => (showModal = false)}
				on:click|self={() => dialog.close()}
				class="modal">

			<div class="modal-body">

				<div class="card p-4 max-h-[300px] overflow-auto space-y-4">
				{#each $comments.slice().reverse() as comment (comment.id)}
				<div class="flex items-center">
					<Avatar initials={user} background="bg-primary-500" width="w-9" class="mr-4"/>
					<div class = "inhaltComments" style="margin-left: 1vh; width: 80vh;">&nbsp;{comment.content}<br></div>      
				</div>
				{/each}	
			</div>

			</dialog>
		<div class="card p-4 max-h-[480px] overflow-auto space-y-4" style = "border: 1px solid #b4e2ff;">
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
				<button type="button" class="btn-icon !bg-transparent" on:click={openModal}>
					<i class="fa fa-comment-o" aria-hidden="true"></i>
				</button>
			</div>
		</div>
		{/each}
		</div>

		{/if}
	</svelte:fragment>
</TabGroup>
			
</div>

<style>
	.user {
        display: flex;
        align-items: center;
    }

    .user-info {
        margin-left: 8px;
    }


	.centered-content {
   		display: flex;
    	justify-content: center;
  		align-items: center;
    }

	.counts {
		display: flex;
		text-align: left;
		margin-bottom: 3vh;
	}

	.counts span:not(:last-child) {
   		margin-right: 5vh;
    }

	.counts .count {
    	font-weight: bold;
    	margin-right: 10px;
    }
</style>