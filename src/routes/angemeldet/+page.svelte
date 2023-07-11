<script>
  import { onMount } from 'svelte';
  import { Avatar, Modal, modalStore } from '@skeletonlabs/skeleton';
  import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
import { popup } from '@skeletonlabs/skeleton';
  import { createEventDispatcher } from 'svelte';

  let posts = [ ];
  let postContent = '';
  let selectedPostId = null;
  let comments = [];
  let commentInput = '';
   export let writing = '';
   let showModal = false;
   const dispatch = createEventDispatcher();


   

  
  const getPosts = async () => {
    try {
      const response = await fetch('https://linkup-api.de/api/posts?limit=100', {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        posts = await response.json();
        console.log('Posts erfolgreich gefetcht')
      } else {
        throw new Error('Fehler beim Abrufen der Posts');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getPostComments = async (postId) => {
    try {
      const response = await fetch(`https://linkup-api.de/api/comments/posts/${postId}`, {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        comments = await response.json();
        showModal = true;
      } else {
        throw new Error('Fehler beim Abrufen der Kommentare');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const likePost = async (postId) => {
  try {
  const response = await fetch(`https://linkup-api.de/api/likes/${postId}`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  });
  if (response.ok) {
    console.log('Post wurde geliked');
    console.log(response.status);
  } else {
    throw new Error('Fehler beim Liken des Posts');
  }
} catch (error) {
  console.error(error);
}
await getPosts();
};

const createPost = async () => {
    try {
      const response = await fetch('https://linkup-api.de/api/posts', {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          content: postContent
        })
      });

      if (response.ok) {
        console.log(response.status);
        const responseBody = await response.json();
        console.log(responseBody);
        postContent = '';
      } else {
        throw new Error('Fehler beim Erstellen des Posts');
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handlePostClick = async (postId) => {
    selectedPostId = postId;
    await getPostComments(postId);
  };

  const handleClick2 = async () => {
    try {
      await createPost();
      console.log('Post erfolgreich erstellt');
    } catch (error) {
      console.error(error);
    }
    await getPosts();
  };

  onMount(async () => {
    try {
      await getPosts();
    } catch (error) {
      console.error(error);
    }
  });
  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }

  function handleClick() {
    openModal();
    dispatch('buttonClick');
  }

  function formatiereDatum(apiDatum) {
    const datumUhrzeit = new Date(apiDatum);
    const tag = datumUhrzeit.getDate();
    const monat = datumUhrzeit.getMonth() + 1;
    const jahr = datumUhrzeit.getFullYear();
    const stunde = datumUhrzeit.getHours();
    const minute = datumUhrzeit.getMinutes();

    return `${tag}.${monat}.${jahr} - ${stunde}:${minute < 10 ? '0' + minute : minute} Uhr`;
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleClick2();
    }
  }
</script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<div class=" bg-secondary-400 card p-4 max-h-[400px] " style="border: 0px solid black; border-radius: 10px; background:transparent; margin-bottom:-10px;margin-top:-10px;">
    <h3><strong>Erstelle einen Post</strong></h3>
    <br>
		<textarea bind:value={postContent} class="textarea"  placeholder=" Dein Post" on:keydown={handleKeyDown}></textarea>
	<div class="buttons">
            <button type="button" class="btn variant-ghost-primary self-end" on:click={handleClick2}>Posten</button>
            <button type="button" class="btn variant-ghost-primary self-end">Post generieren</button>
        </div>
</div>

<div class="con" style="display: flex; flex-direction: row;">
  <div class="bg-secondary-400 card p-4 max-h-[440px] overflow-auto space-y-4" style="border: 2px solid black; border-radius: 10px;">
    {#each posts as post}
      <div class="bg-secondary-200 card p-4 flex flex-col gap-3" style="margin: 10px; border: 0.5px solid black; border-radius: 10px;">
        <div class="postheader">
          <Avatar initials={post.user.username} background="bg-primary-500" width="w-9" class="mr-4" />
          <strong style="margin-right: 6vh;">@{post.user.username}</strong>
          <span style="font-size: 12px;">{formatiereDatum(post.createdAt)}</span>
        </div>
        <div class="n" style="margin-left: 3vh; border-radius: 5px;">&nbsp;{post.content}<br></div>
        <div class="actions">
          <button type="button" class="btn-icon !bg-transparent" on:click={() => likePost(post.id)}>
            <i class="fa fa-heart-o" aria-hidden="true"></i>
          </button>
          <h3 class="counter">{post.numberOfLikes}&nbsp&nbsp</h3>
          <button type="button" class="btn-icon !bg-transparent" on:click={() => handlePostClick(post.id)}>&nbsp&nbsp
            <i class="fa fa-comment-o" aria-hidden="true"></i>&nbsp&nbsp
            <h3 class = "counter"> {post.numberOfComments}&nbsp&nbsp</h3>
          </button>
        </div>
      </div>
    {/each}
  </div>
</div>

{#if showModal}

  <div class="bg-secondary-600 modal" style="width: 400px;">
    <div style="display: flex; justify-content: flex-end;">
      <button type="button" class="close-button" on:click={closeModal}>
        <svg class="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <h3>Kommentare</h3>
    {#if selectedPostId !== null}
      <div>
        {#if comments !== null}
          <div class="card p-4 max-h-[300px] overflow-auto space-y-4" style="border: 1px solid black;">
            {#each comments as comment}
              <div class="flex items-center">
                <Avatar initials={comment.user.username} background="bg-primary-500" width="w-14" class="mr-4" />
                <div class="inhaltComments" style="margin-left: 1vh; width: 80vh;">&nbsp;{comment.comment}<br></div>
              </div>
            {/each}
          </div>
          {:else}
          <p>Keine Kommentare vorhanden.</p>
        {/if}
      </div>
    {/if}
    <textarea bind:value={commentInput} class="textarea" rows="1" style="height:5vh;" placeholder="Gib deinen Kommentar ein"></textarea>
    <button type="button" class="btn variant-ghost-surface">Kommentieren</button>
  </div>

{/if}

<style>
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border: 1px solid black;
    border-radius: 4px;
    z-index: 9999;
  }

  .modal-content {
    margin: 20% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    border-radius: 10px;
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  .actions {
		display: flex;
		text-align: left;
	}

 
	.postheader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 6px;
}

.postheader span {
  font-size: 12px;
  margin-left: auto;
}


	.actions {
		display: flex;
		text-align: left;
	}

    .con {
  display: flex;
  flex-direction: row;
  flex: 1;
}

	.counter {
		margin-top: 6px;
	}

    .card {
		margin-bottom: 20px; 
        margin: 20px;
        flex: 1;
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