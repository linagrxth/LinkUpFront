<script>
  import { onMount } from 'svelte';
  import { Avatar, Modal, modalStore } from '@skeletonlabs/skeleton';
  import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';

  let posts = [];
  let selectedPostId = null;
  let comments = [];
  let showModal = false; // Added variable to control modal visibility

  export let writing = '';

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
          content: 'Hey :)!'
        })
      });

      if (response.ok) {
        console.log(response.status);
        const responseBody = await response.json();
        console.log(responseBody);
      } else {
        throw new Error('Error creating post');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getPosts = async () => {
    try {
      const response = await fetch('https://linkup-api.de/api/posts', {
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
        throw new Error('Error retrieving posts');
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
        throw new Error('Error retrieving comments');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostClick = async (postId) => {
    selectedPostId = postId;
    await getPostComments(postId);
  };

  onMount(async () => {
    try {
      await getPosts();
    } catch (error) {
      console.error(error);
    }
  });

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

<div class="con">
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
          <button type="button" class="btn-icon !bg-transparent">
            <i class="fa fa-heart-o" aria-hidden="true"></i>
          </button>
          <h3 class="counter">{post.numberOfLikes}</h3>
          <button type="button" class="btn-icon !bg-transparent" on:click={() => handlePostClick(post.id)}>
            <i class="fa fa-comment-o" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    {/each}
  </div>
</div>

<Modal bind:isOpen={showModal}>
  <div class="modal-content">
    <span class="close" on:click={() => showModal = false}>&times;</span>
    <h2>Comments</h2>
    {#each comments as comment}
      <p>{comment.text}</p>
    {/each}
  </div>
</Modal>

<style>
  .con {
    display: flex;
    flex-direction: row;
  }

  .card {
    border: 2px solid black;
    border-radius: 10px;
  }

  .post {
    margin: 10px;
    border: 0.5px solid black;
    border-radius: 10px;
  }

  .postheader {
    display: flex;
    align-items: center;
    margin-right: 6vh;
  }

  .n {
    margin-left: 3vh;
    border-radius: 5px;
  }

  .actions {
    display: flex;
    align-items: center;
  }

  .btn-icon {
    background-color: transparent;
  }

  .modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
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
   
  }
</style>