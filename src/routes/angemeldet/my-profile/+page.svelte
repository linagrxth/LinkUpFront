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
	export let bio = '~good vibes~';
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
		{#if tabSet === 0}	
		{:else if tabSet === 1}
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

		{:else if tabSet === 2}
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
		{:else if tabSet === 3}
	
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