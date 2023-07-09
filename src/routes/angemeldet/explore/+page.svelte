
<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
  import { Avatar, Modal, modalStore } from '@skeletonlabs/skeleton';
  import type { ModalSettings } from '@skeletonlabs/skeleton';

  let tabSet: number = 0;
  let tabsBottomNav = 0;
	let value: boolean = false;
	let checkedValue = false;
  let id = 1;
  export let user = 'Klara';
  export let createdAt = '12-09-2023';
  export let data;

  const initialDataTop = [
    {
      id: id++,
      user: user,
      createdAt: createdAt,
      content: 'Das ist der Start',
      isFavorite: false,
      likes: 5000,
    },
	{
      id: id++,
      user: 'Jenny',
      createdAt: '01-09-2023',
      content: 'Ich bin popular',
      isFavorite: false,
      likes: 4752,
    },
	{
      id: id++,
      user: 'Nicklas',
      createdAt: '05-09-2023',
      content: 'Ich bin auch ganz cool',
      isFavorite: false,
      likes: 3222,
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

	export const posts = writable(initialDataTop);
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

    export const toggleFavorite = (post: { id: number; user: string; createdAt: string; content: string; isFavorite: boolean; likes: number }) => {
		post.isFavorite = !post.isFavorite;
		if (post.isFavorite) {
			post.likes++;
		} else {
			post.likes--;
		}
		posts.update((value) => [...value]);
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

        export const openModal = () => {
            showModal = true;
        };

        export const closeModal = () => {
            showModal = false;
        };

        $: {
            if (dialog && showModal) dialog.showModal();
        };
        function handleKeyDown(event: { key: string; preventDefault: () => void; }) {
          if (event.key === "Enter") {
            event.preventDefault(); // Verhindert das Standardverhalten des Textbereichs (Zeilenumbruch)
            handleComment();
          };
        };
</script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<TabGroup justify="justify-center" padding="px-10 py-3" active= "variant-filled-primary">
	<Tab bind:group={tabSet} name="tab1" value={0}><strong>Top</strong></Tab>
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
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

		
		{/if}
	</svelte:fragment>
</TabGroup>
			
<style>
	.postheader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
}

.postheader span {
  font-size: 12px;
  margin-left: auto;
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

	

        .inhaltComments{
		    border-radius: 10px;
        margin: 5px;
        height: 30px;
    }



    .modal-footer {
      margin-top: auto;
	  }

    .textarea{
      border: 1px solid #D8D8D8;
		  border-radius: 10px;
    }

    .modal {
  border-radius: 10px;
  border: 1px solid black;
}




    
</style>