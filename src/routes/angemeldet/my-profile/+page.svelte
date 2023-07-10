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
	export let isFavorite = false;
	export let likes = writable(0);
	export let data;

	export const handleTabChange = (event: CustomEvent<number>) => {
    tabSet = event.detail;
  };

	onMount(() => {
    
  });

let follower = [
    { initials: "MM", name:"Marc Budde"},
    { initials: "EM", name:"Emma Brüh"},
    { initials: "JD", name:"John max"}
  ];

let following = [
    { initials: "MM", name:"Hoplger Theis"},
    { initials: "EM", name:"Jennifer Tielke"},
    { initials: "JD", name:"Justin Abra"}
  ];

  export const removeItem = (index: number) => {
		// Entferne den Listeneintrag mit dem angegebenen Index
		// Hier kannst du die entsprechende Logik zum Entfernen des Listeneintrags implementieren
	};



  export let id = 1;
  export let createdAt = '';

  const initialPosts = [
    {
      id: id++,
      user: user,
      createdAt: createdAt,
      content: 'Das ist der Start',
      isFavorite: false,
      likes: 5
    },
	{
		id: id++,
		user: user,
		createdAt: createdAt,
		content: 'ich will nicht weinen',
		isFavorite: true,
		likes: 15
	}
  ];

  const initialComments = [
    {
      id: id++,
      user: user,
      createdAt: createdAt,
      content: 'Voll guter Post',
    }
  ];

  export const posts = writable(initialPosts);
  export const comments = writable(initialComments);
  export let writing = '';
  export let commentInput = '';

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

  export const handleComment = () => {
    if (commentInput.trim() !== '') {
      const newComment = {
        id: id++,
        user: user,
        createdAt: createdAt,
        content: commentInput
      };
      comments.update((value) => [...value, newComment]);
      commentInput = '';
    }

    comments.update((value) => [...value]);
    };

  export const generatePost = {
    //Funktion, um mit ChatGPT einen Post zu generieren
  }

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
		const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        createdAt = `${day}.${month}.${year} ${hours}:${minutes}`;});

        export let showModal = false;
        let dialog: HTMLDialogElement;

        // Funktion zum Öffnen des Modals
        export const openModal = () => {
            showModal = true;
        };

        // Funktion zum Schließen des Modals
        export const closeModal = () => {
            showModal = false;
        };

        // Dialog-Element aktualisieren, wenn showModal geändert wird
        $: {
            if (dialog && showModal) dialog.showModal();
        };

		function handleKeyDown(event: { key: string; preventDefault: () => void; }) {
          if (event.key === "Enter") {
            event.preventDefault(); // Verhindert das Standardverhalten des Textbereichs (Zeilenumbruch)
            handleComment();
          };
        };

function formatiereDatum(apiDatum) {
    const datumUhrzeit = new Date(apiDatum);
    const tag = datumUhrzeit.getDate();
    const monat = datumUhrzeit.getMonth() + 1; // Monate beginnen bei 0
    const jahr = datumUhrzeit.getFullYear();
    const stunde = datumUhrzeit.getHours();
    const minute = datumUhrzeit.getMinutes();

    return `${tag}.${monat}.${jahr} - ${stunde}:${minute < 10 ? '0' + minute : minute} Uhr`;
  }

</script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

{#each data.nutzer as nutzer}
<div class="user">
	<Avatar initials={nutzer.username} background="bg-primary-500" />
	<div class="user-info">
		<span>@{nutzer.username}</span>
	</div>
</div>

	<div style="margin-top: 3vh; margin-bottom: 3vh;">{nutzer.bio}</div>
	<div class="counts">
		<span><span class="count">{postcount}</span>Posts</span>
  		<span><span class="count">{followercount}</span>Followers</span>
  		<span><span class="count">{followedcount}</span>Followed</span>
	</div>
		<a href = "setting/profilsetting">
	<button type="button" class="btn btn-sm variant-ghost-primary self-end">Profil bearbeiten</button>
	</a>
	<br><br>
	{/each}
<div class="Tabs">


    
<TabGroup justify="justify-center" padding="px-20 py-3" on:change={handleTabChange}>
	<Tab bind:group={tabSet} name="tab1" value={0}>Posts</Tab>
	<Tab bind:group={tabSet} name="tab2" value={1}>Followers</Tab>
	<Tab bind:group={tabSet} name="tab3" value={2}>Following</Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		{#if tabSet == 0}	

				<dialog bind:this={dialog} on:close={() => (showModal = false)} class="bg-secondary-600 modal">
  <div class="modal-body">
    <!--Anzeige-->
    <div class="card p-4 max-h-[300px] overflow-auto space-y-4" style="border: 1px solid black;">
      {#each $comments.slice().reverse() as comment (comment.id)}
      <div class="flex items-center">
        <Avatar initials={user} background="bg-primary-500" width="w-9" class="mr-4" />
        <div class="inhaltComments" style="margin-left: 1vh; width: 80vh;">&nbsp;{comment.content}<br></div>
      </div>
      {/each}
    </div>
  </div>
  <div class="modal-footer">
    <div class="card p-4 max-h-[480px]" style="border: 1px solid black;">
      <form>
        <textarea bind:value={commentInput} class="textarea" rows="1" style="height:5vh;" placeholder="Gib deinen Kommentar ein" on:keydown={handleKeyDown}/>

        <button type="button" class="btn variant-ghost-surface" on:click={handleComment}>Kommentieren</button>
        
      </form>
    </div>
  </div>
  <button class="absolute top-0 right-0 p-2" style="z-index: 1;" on:click|stopPropagation={() => dialog.close()}>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</dialog>


<div class = "con" style="display: flex; flex-direction: row;">
<br>
	


    <div class=" bg-secondary-400 card p-4 max-h-[440px] overflow-auto space-y-4" style="border: 2px solid black; border-radius: 10px;">


		{#each data.posts.slice() as post (post.id)}
	<div class=" bg-secondary-200 card p-4 flex flex-col gap-3" style = " margin:10px; border: 0.5px solid black; border-radius: 10px;" >
		<div class="postheader">
			<Avatar initials={post.user.username} background="bg-primary-500" width="w-9" class="mr-4"/>
			<strong style="margin-right: 6vh;">@{post.user.username}</strong> 
      <span style="font-size: 12px; ">{formatiereDatum(post.createdAt)}</span>
		</div>
		<div class="n" style="margin-left: 3vh; border-radius: 5px;">&nbsp;{post.content}<br></div>

		<div class="actions">
			<button type="button" class="btn-icon !bg-transparent" on:click={() => toggleFavorite(post)}>
				{#if post.isFavorite}
					<i class="fa fa-heart" aria-hidden="true"></i>
				{:else}
					<i class="fa fa-heart-o" aria-hidden="true"></i>
				{/if}
			</button>
			<h3 class="counter">{post.numberOfLikes}</h3>
			<button type="button" class="btn-icon !bg-transparent" on:click={openModal}>
				<i class="fa fa-comment-o" aria-hidden="true"></i>
			</button>
		</div>
	</div>
{/each}
</div>
</div>

		{:else if tabSet == 1}
			<div class="centered-content">
				<div class="card p-4" style="width: 50vh;">
						<ul class="list">
							{#each follower as ben}
						<li>
						<Avatar initials="{ben.initials}" background="bg-primary-500" width="w-10" />
						<span class="flex-auto">{ben.name}</span>
						<button type="button" class="btn-icon btn-icon-sm variant-ghost-primary"><i class="fa fa-eye" aria-hidden="true"></i></button>
						<button type="button" class="btn-icon btn-icon-sm variant-ghost-warning"><i class="fa fa-times" aria-hidden="true"></i></button>
						</li>
{/each}

						</ul>
				</div>
			</div>

		{:else if tabSet == 2}
		<div class="centered-content">
			<div class="card p-4" style="width: 50vh;">
				<ul class="list">
					
						{#each following as beni}
						<li>
						<Avatar initials="{beni.initials}" background="bg-primary-500" width="w-10" />
						<span class="flex-auto">{beni.name}</span>
						<button type="button" class="btn-icon btn-icon-sm variant-ghost-primary"><i class="fa fa-eye" aria-hidden="true"></i></button>
						<button type="button" class="btn-icon btn-icon-sm variant-ghost-warning"><i class="fa fa-times" aria-hidden="true"></i></button>
						</li>
{/each}
					
				</ul>
			</div>
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

	.postheader {
		display: flex;
		text-align: left;
		margin-left: 1vh;
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

    .con{
        margin: 20px;
    }

    .con strong{
        font-size: 25px;
    }

	.modal {
  		border-radius: 10px;
  		border: 1px solid black;
	}


</style>