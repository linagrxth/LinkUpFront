
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

  	let idNew = 1;
	  export let userNew = 'Marc';
	  export let createdAtNew = '13-09-2023';


    const initialDataNew = [
    {
      idNew: idNew++,
      userNew: userNew,
      createdAtNew: createdAtNew,
      contentNew: 'Das ist der Start',
      isFavoriteNew: false,
      likesNew: 5,
    },
	{
      idNew: idNew++,
      userNew: 'Lina',
      createdAtNew: '24-06-2023',
      contentNew: 'Ganz schön neuer Post',
      isFavoriteNew: false,
      likesNew: 50,
    },
	{
      idNew: idNew++,
      userNew: 'Marc',
      createdAtNew: '24-06-2023',
      contentNew: 'Der Post ist viel neuer',
      isFavoriteNew: false,
      likesNew: 2,
    }
  ];

  	export const postsNew = writable(initialDataNew);
  	export let writingNew = '';

	export const handlePostNew = () => {
    if (writingNew.trim() !== '') {
      const newPostNew = {
        idNew: id++,
        userNew: userNew,
        createdAtNew: createdAtNew,
        contentNew: writingNew,
        isFavoriteNew: false,
        likesNew: 0,
      };
      postsNew.update((value) => [...value, newPostNew]);
      writingNew = '';
    }
  };

  export const toggleFavoriteNew = (postNew: { idNew: number; userNew: string; createdAtNew: string; contentNew: string; isFavoriteNew: boolean; likesNew: number }) => {
		postNew.isFavoriteNew = !postNew.isFavoriteNew;
		if (postNew.isFavoriteNew) {
			postNew.likesNew++;
		} else {
			postNew.likesNew--;
		}
		postsNew.update((value) => [...value]);
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

        export const openModal = () => {
            showModal = true;
        };

        export const closeModal = () => {
            showModal = false;
        };

        $: {
            if (dialog && showModal) dialog.showModal();
        };
</script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<TabGroup justify="justify-center" padding="px-10 py-3" active= "variant-filled-primary">
	<Tab bind:group={tabSet} name="tab1" value={0}><strong>Top</strong></Tab>
	<Tab bind:group={tabSet} name="tab2" value={1}><strong>New</strong></Tab>
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
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
<div class="modal-footer">
<div class="card p-4 max-h-[480px]"style = "border: 1px solid #b4e2ff;">
  <form>
		<textarea bind:value={commentInput} class="textarea" rows="1" style="height:5vh;" placeholder="Gib deinen Kommentar ein" />
		<button type="button" class="btn variant-ghost-primary self-end" on:click={handleComment}>Kommentieren</button>
	</form>
</div>
</dialog>

<div class = "con" style="display: flex; flex-direction: row;">
<br>
	<form class="card p-4 flex flex-col gap-3"style="width: 200px; height: fit-content;border: 1px solid #b4e2ff;">
		<p><strong>Hier siehst du immer die beliebtestens Posts. <i class="fa fa-bolt" aria-hidden="true"></i></strong></p>
	</form>

<div class="cardi" style= "width: 800px; height: 400px;">
    <div class="card p-4 max-h-[440px] overflow-auto space-y-4" style = "border: 1px solid #b4e2ff;">
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
</div>
</div>

		{:else if tabSet === 1}
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
<div class="modal-footer">
<div class="card p-4 max-h-[480px]">
  <form>
		<textarea bind:value={commentInput} class="textarea" rows="1" style="height:5vh;" placeholder="Gib deinen Kommentar ein" />
		<button type="button" class="btn variant-ghost-primary self-end" on:click={handleComment}>Kommentieren</button>
	</form>
</div>
</dialog>

<div class = "con" style="display: flex; flex-direction: row;">
<br>
	<form class="card p-4 flex flex-col gap-3"style="width: 200px; height: fit-content;border: 1px solid #b4e2ff;">
		<p><strong>Hier siehst du immer die top aktuellsten Posts. <i class="fa fa-clock-o" aria-hidden="true"></i></strong></p>
	</form>
<div class="cardi" style= "width: 800px; height: 500px;">
    <div class="card p-4 max-h-[440px] overflow-auto space-y-4" style = "border: 1px solid #b4e2ff;">
		{#each $postsNew.slice().reverse() as postNew (postNew.idNew)}
	<div class="card p-4 flex flex-col gap-3" style = "border: 1px solid #D8D8D8; margin:10px;" >
		<div class="postheader">
			<Avatar initials={userNew} background="bg-primary-500" width="w-9" class="mr-4"/>
			<strong style="margin-right: 6vh;">{postNew.userNew}</strong> {postNew.createdAtNew}
		</div>
		<div class = "inhalt" style="margin-left: 3vh;">&nbsp;{postNew.contentNew}<br></div>
		<div class="actions">
			<button type="button" class="btn-icon !bg-transparent" on:click={() => toggleFavoriteNew(postNew)}>
				{#if postNew.isFavoriteNew}
					<i class="fa fa-heart" aria-hidden="true"></i>
				{:else}
					<i class="fa fa-heart-o" aria-hidden="true"></i>
				{/if}
			</button>
			<h3 class="counter">{postNew.likesNew}</h3>
			<button type="button" class="btn-icon !bg-transparent" on:click={openModal}>
				<i class="fa fa-comment-o" aria-hidden="true"></i>
			</button>
		</div>
	</div>
{/each}
</div>
</div>
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

        .inhaltComments{
		    border-radius: 10px;
        margin: 5px;
        height: 30px;
    }

    .modal-content {
      width: 500px;
      height: 300px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .modal-footer {
      margin-top: auto;
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
