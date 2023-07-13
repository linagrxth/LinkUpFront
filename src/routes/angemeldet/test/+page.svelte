<script>
  import { onMount } from 'svelte';
  import { Avatar, Modal, modalStore } from '@skeletonlabs/skeleton';
  import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
  import { popup } from '@skeletonlabs/skeleton';
  import { createEventDispatcher } from 'svelte';

  let posts = [];
  let selectedPostId = null;
  let comments = [];
  let userData = null;
  let currentUser = [];
  let followers = [];
  let following = [];
  let followings = [];
  export let writing = '';
  let tabSet = 0;
  let userId = '';
  let commentInput = '';
   let showModal = false;
   const dispatch = createEventDispatcher();


  const handleLogin = async () => {
    // ...
  };

const getPosts = async (userId) => {
  try {
    const response = await fetch(`https://linkup-api.de/api/posts/user/${userId}`, {
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
        posts = responseData;
      } else {
        posts = [];
      }
    } else {
      throw new Error('Fehler beim Abrufen der Posts');
    }
  } catch (error) {
    console.error(error);
    posts = []; // Setze posts auf leeres Array, um anzuzeigen, dass keine Posts vorhanden sind
  }
};

    const getFollowers = async (userId) => {
  try {
    const response = await fetch(`https://linkup-api.de/api/follows/${userId}/followers`, {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (response.ok) {
      const followersData = await response.json();

      // Check if followersData is an array
      if (Array.isArray(followersData)) {
        followers = followersData;
      } else {
        followers = [];
      }
    } else {
      throw new Error('Fehler beim Abrufen der Follower');
    }
  } catch (error) {
    console.error(error);
    followers = []; // Set followers to an empty array to indicate that no followers are available
  }
};

const getFollowings = async (userId) => {
  try {
    const response = await fetch(`https://linkup-api.de/api/follows/${userId}/followings`, {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (response.ok) {
      const followingsData = await response.json();

      // Check if followingsData is an array
      if (Array.isArray(followingsData)) {
        followings = followingsData;
      } else {
        followings = [];
      }
    } else {
      throw new Error('Fehler beim Abrufen der Following');
    }
  } catch (error) {
    console.error(error);
    followings = []; // Set followings to an empty array to indicate that no followings are available
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
  await getPosts(userId);
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
    await getPosts(userId);
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
    await getPosts(userId);
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

const deletePost = async (postID) => {

try {
    const response = await fetch(`https://linkup-api.de/api/posts/${postID}`, {
    mode: 'cors',
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include',
});

if (response.ok) {
  console.log('Post wurde gelöscht');
  console.log(response.status);
} else {
  throw new Error('Fehler beim Löschen des Posts');
}
} catch (error) {
  console.error(error);
}
await getPosts(currentUser.id);
};

const deleteFollowing = async (userID) => {

try {
    const response = await fetch(`https://linkup-api.de/api/follows/${userID}`, {
    mode: 'cors',
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include',
});

if (response.ok) {
  console.log('Freundschaft wurde gelöscht');
  console.log(response.status);
} else {
  throw new Error('Fehler beim Löschen der Freundschaft');
}
} catch (error) {
  console.error(error);
}
await getFollowings(userId);
};

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


  function handleKeyDown(event) {
    if (event.key === "Enter") {
      postComment();
    }
  }

  const toggleLike = async (postId, likedByCurrentUser) => {
    if (likedByCurrentUser) {
      await deleteLike(postId);
    } else {
      await likePost(postId);
    }
    await getPosts(userId);
  };

  const handlePostClick = async (postId) => {
    selectedPostId = postId;
    await getPostComments(postId);
    showModal = true;
  };

    async function fetchUserData(userId) {
    try {
      const response = await fetch(`https://linkup-api.de/api/users/${userId}`, {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        userData = await response.json();
      } else {
        console.error('Failed to fetch user data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


  

  onMount(async () => {
    try {
    const params = new URLSearchParams(window.location.search);
		userId = params.get('username');
    if (userId.startsWith('$')) {
      userId = userId.substring(1);
      }
        await getCurrentUser();
        await fetchUserData(userId);
        await getFollowers(userId);
        await getFollowings(userId);
        await getPosts(userId);
      }
     catch (error) {
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
</script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<div class="Tabs">
  {#if userData !== null}
    <div class="user">
      <Avatar initials={userData.username} background="bg-primary-500" />
      <div class="user-info">
  <strong style="display: block; font-size: 17px;">{userData.name}</strong>
  <span style="display: block; font-size: 13px;">@{userData.username}</span>
      </div>
    </div>
    <div style="margin-top: 3vh; margin-bottom: 3vh;">{userData.bio}</div>
    <div class="counts">
    
      <span><span class="count">{userData.numberFollowers}</span>Followers</span>
      <span><span class="count">{userData.numberFollowing}</span>Followed</span>
    </div>
    <a href="setting/profilsetting">
      <button type="button" class="btn btn-sm variant-ghost-primary self-end">Folgen</button>
    </a>
    <br><br>
  {/if}
</div>

<TabGroup justify="justify-center" padding="px-10 py-3" active= "variant-filled-primary">
	<Tab bind:group={tabSet} name="tab1" value={0}><strong>Top</strong></Tab>
  <Tab bind:group={tabSet} name="tab2" value={1}>Followers</Tab>
	<Tab bind:group={tabSet} name="tab3" value={2}>Following</Tab>
	<svelte:fragment slot="panel">
		{#if tabSet === 0}

<div class="con" style="display: flex; flex-dire0tion: row;">
  <div class="bg-secondary-400 card p-4 max-h-[190px] overflow-auto space-y-4" style="border: 2px solid black; border-radius: 10px;">
    {#each posts as post}
      <div class="bg-secondary-200 card p-4 flex flex-col gap-3" style="margin: 10px; border: 0.5px solid black; border-radius: 10px;">
        <div class="postheader">
          <Avatar initials={post.user.username} background="bg-primary-500" width="w-9" class="mr-4" />
           
  <strong style="margin-right: 6vh;">@{post.user.username}</strong>


          <span style="font-size: 12px;">{formatiereDatum(post.createdAt)}</span>
        </div>
        <div class="n" style="margin-left: 3vh; border-radius: 5px;">&nbsp;{post.content}<br></div>
        <div class="actions">
          <button type="button" class="btn-icon !bg-transparent" on:click={() => toggleLike(post.id, post.likedByCurrentUser)}>
            {#if post.likedByCurrentUser}
            <i class="fa fa-heart" aria-hidden="true"></i>
            {:else}
            <i class="fa fa-heart-o" aria-hidden="true"></i>
            {/if}
          </button>
          <strong class="counter">{post.numberOfLikes}</strong>
          <button type="button" class="btn-icon !bg-transparent" on:click={() => handlePostClick(post.id)}>
            <i class="fa fa-comment-o" aria-hidden="true"></i>
          </button>
          <strong class = "counter"> {post.numberOfComments}</strong>
          
          
        </div>
      </div>
    {/each}
  </div>
</div>

{:else if tabSet == 1}
<div class="centered-content">
  <div class="card p-4" style="width: 50vh;">
    <ul class="list">
      {#each followers as foll}
        <li>
          <Avatar initials="{foll.username}" background="bg-primary-500" width="w-10" />
          <span class="flex-auto">{foll.username}</span>
          <a href="/angemeldet/other-profile?username=${encodeURIComponent(foll.id)}"
             onclick="event.preventDefault(); window.location.href=this.getAttribute('href');">
            <button type="button" class="btn-icon btn-icon-sm variant-ghost-primary">
              <i class="fa fa-eye" aria-hidden="true"></i>
            </button>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</div>



		{:else if tabSet == 2}

<div class="centered-content">
  <div class="card p-4" style="width: 50vh;">
    <ul class="list">
      {#each followings as following}
        <li>
          <Avatar initials="{following.username}" background="bg-primary-500" width="w-10" />
          <span class="flex-auto">{following.username}</span>
          <a href="/angemeldet/other-profile?username=${encodeURIComponent(following.id)}"
             onclick="event.preventDefault(); window.location.href=this.getAttribute('href');">
            <button type="button" class="btn-icon btn-icon-sm variant-ghost-primary">
              <i class="fa fa-eye" aria-hidden="true"></i>
            </button>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</div>


		{/if}
	</svelte:fragment>
</TabGroup>


{#if showModal}
  <div class="bg-secondary-300 card p-4 space-y-4 modal" style="border: 2px solid black; border-radius: 10px; width: 400px;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h3 class="mt-2" style="flex: 1;">Kommentare</h3>
      <button type="button" class="btn variant-ghost close-button" on:click={closeModal}>
        <svg class="w-3 h-3 text-black-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
{#if selectedPostId !== null}
  <div>
    <div class="card p-4 max-h-[200px] overflow-auto space-y-4" style="border: 1px solid black;">
      {#each comments.slice().reverse() as comment}
        <div class="flex items-center comment-wrapper" style="margin-bottom: 20px;">
          <Avatar initials={comment.user.username} background="bg-primary-500" width="w-16" class="mr-4" />
          <div class="inhaltComments" style="margin-left: 1vh; width: 80vh;">
            <a href="/angemeldet/other-profile?username=${encodeURIComponent(comment.user.id)}"
   style="text-decoration: none;"
   onclick="event.preventDefault(); window.location.href=this.getAttribute('href');">
  <div class="username">@{comment.user.username}</div>
</a>

            {comment.comment}
            <br>
            <br>
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}
    <div style="display: flex;">
      <textarea bind:value={commentInput} class="textarea" rows="1" style="height: 5vh; flex: 1;" placeholder="Gib deinen Kommentar ein" on:keydown={handleKeyDown}></textarea>
      <button type="button" class="btn variant-ghost-surface" on:click={postComment}><i class="fa fa-reply-all" aria-hidden="true"></i></button>
    </div>
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

  .username {
  font-size: 10px;
}

  close {
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

.counts span:not(:last-child) {
   		margin-right: 5vh;
    }

	.counts .count {
    	font-weight: bold;
    	margin-right: 10px;
    }
	.counts {
		display: flex;
		text-align: left;
		margin-bottom: 3vh;
	}


</style>