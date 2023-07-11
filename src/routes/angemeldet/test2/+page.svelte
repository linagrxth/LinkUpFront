<script>
  import { onMount } from 'svelte';
  import { Avatar } from '@skeletonlabs/skeleton';
  import { createEventDispatcher } from 'svelte';

  let posts = [];
  let selectedPostId = null;
  let comments = [];

  let commentInput = '';
  let currentUser = [];
  let showModal = false;
  const dispatch = createEventDispatcher();

  const handleLogin = async () => {
    // ...
  };

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      postComment();
    }
  }

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
      } else {
        throw new Error('Fehler beim Abrufen der Posts');
      }
    } catch (error) {
      console.error(error);
      comments = [];
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
      const responseData = await response.json();

      // Check if responseData is an array
      if (Array.isArray(responseData)) {
        comments = responseData;
      } else {
        comments = [];
      }
    } else {
      throw new Error('Fehler beim Abrufen der Kommentare');
    }
  } catch (error) {
    console.error(error);
  }
  await getPosts();
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

  const deleteLike = async (postId) => {
    try {
      const response = await fetch(`https://linkup-api.de/api/likes/${postId}`, {
        mode: 'cors',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });

      if (response.ok) {
        console.log('Like wurde gelöscht');
        console.log(response.status);
      } else {
        throw new Error('Fehler beim Löschen des Likes');
      }
    } catch (error) {
      console.error(error);
    }
    await getPosts();
  };

  const toggleLike = async (postId, likedByCurrentUser) => {
    if (likedByCurrentUser) {
      await deleteLike(postId);
    } else {
      await likePost(postId);
    }
    await getPosts();
  };

  const handlePostClick = async (post) => {
    selectedPostId = post.id;
    await getPostComments(selectedPostId);
    await getPosts();
    showModal = true;
  
  };

  onMount(async () => {
    try {
      await handleLogin();
      await getPosts();
    } catch (error) {
      console.error(error);
    }
  });

  const postComment = async () => {

    if (commentInput.trim() === '') {
    console.log('Comment input is empty. Skipping comment submission.');
    return;
  }
  try {
    const response = await fetch('https://linkup-api.de/api/comments', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        comment: commentInput,
        postId: selectedPostId
      })
    });

    if (response.ok) {
      console.log('Kommentar wurde gepostet');
      console.log(response.status);
      const newComment = await response.json();

      // Add the current user's username to the new comment
      await getCurrentUser();
      newComment.user = {
        username: currentUser.username
      };

      comments = comments.concat(newComment);
      commentInput = '';

      // Aktualisiere die Kommentare für den ausgewählten Post
      await getPostComments(selectedPostId);
    } else {
      throw new Error('Fehler beim Posten des Kommentars');
    }
  } catch (error) {
    console.error(error);
  }
};


const getCurrentUser = async () => {
  try {
    const response = await fetch('https://linkup-api.de/api/users/current', {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (response.ok) {
      currentUser = await response.json();
    } else {
      throw new Error('Fehler beim Abrufen des aktuellen Benutzers');
    }
  } catch (error) {
    console.error(error);
  }
};



  function closeModal() {
    showModal = false;
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

  const handleClick = () => {
    dispatch('buttonClick');
  }
</script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

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
          <strong class="counter">{post.numberOfLikes}</strong>
          <button type="button" class="btn-icon !bg-transparent" on:click={() => handlePostClick(post)}>
           <i class="fa fa-comment-o" aria-hidden="true"></i>
          </button>
          <strong class = "counter"> {post.numberOfComments}</strong>
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
    width: 400px; /* Fixed width */
  }
  h3 {
    margin-top: 0.2rem; /* Adjust the value as needed */
  }

  .modal-content {
    margin: 20% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    border-radius: 10px;
  }

  .close {
    color: black;
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
    margin:5px;
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




    .con {
  display: flex;
  flex-direction: row;
  flex: 1;
}

	.counter {
		margin-top: 12px;
    font-size: 15px;
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