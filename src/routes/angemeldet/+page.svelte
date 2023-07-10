
<script lang="ts">
  import { onMount } from 'svelte';
    import { Avatar, Modal, modalStore } from '@skeletonlabs/skeleton';
import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';

  let posts = [];
  let selectedPost = null;
  let comments = [];
  let showModal = false;
  let commentInput;
  let tabSet: number = 0;
  export let writing = '';
  
  

  async function fetchPosts() {
    const response = await fetch('https://linkup-api.de/api/posts');
    const data = await response.json();
    posts = data;
  }

  async function fetchComments(postId) {
    const response = await fetch(`https://linkup-api.de/api/comments/posts/${postId}`);
    const data = await response.json();
    comments = data;
  }

  onMount(fetchPosts); // Beim Laden der Komponente alle Posts abrufen

  function showComments(postId) {
    selectedPost = postId;
    fetchComments(postId);
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }

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


<div class=" bg-secondary-400 card p-4 max-h-[400px] " style="border: 0px solid black; border-radius: 10px; background:transparent; margin-bottom:-10px;margin-top:-10px;">
    <h3><strong>Erstelle einen Post</strong></h3>
    <br>
		<textarea bind:value={writing} class="textarea"  placeholder=" Dein Post" />
	<div class="buttons">
            <button type="button" class="btn variant-ghost-primary self-end" >Posten</button>
            <button type="button" class="btn variant-ghost-primary self-end">Post generieren</button>
        </div>
</div>
<div class = "con" style="display: flex; flex-direction: row;">



    <div class=" bg-secondary-400 card p-4 max-h-[440px] overflow-auto space-y-4" style="border: 2px solid black; border-radius: 10px;">


		{#each posts as post}
	<div class=" bg-secondary-200 card p-4 flex flex-col gap-3" style = " margin:10px; border: 0.5px solid black; border-radius: 10px;" >
		<div class="postheader">
			<Avatar initials={post.user.username} background="bg-primary-500" width="w-9" class="mr-4"/>
			<strong style="margin-right: 6vh;">@{post.user.username}</strong> 
      <span style="font-size: 12px; ">{formatiereDatum(post.createdAt)}</span>
      
		</div>
		<div class="n" style="margin-left: 3vh; border-radius: 5px;">&nbsp;{post.content}<br></div>
        <div class = "actions">
        <button type="button" class="btn-icon !bg-transparent">
				<i class="fa fa-heart-o" aria-hidden="true"></i>
			</button>
      <h3 class="counter">{post.numberOfLikes}</h3>
      <button type="button" class="btn-icon !bg-transparent" on:click={() => showComments(post.id)}>
				<i class="fa fa-comment-o" aria-hidden="true"></i>
			</button>
      
            </div>
	</div>
{/each}
</div>
</div>


{#if showModal}

  <div class="modal"style="display: flex; align-items: center; justify-content: center;">
    <div class="bg-secondary-600 modal-content"style="border: 1px solid black; width: 50%;" >
      <span class="close" style= "color:black;" on:click={closeModal}>&times;</span>
      <h3>Kommentare</h3>
      <ul>
      <div class="card p-4 max-h-[400px] overflow-auto space-y-4" style="border: 1px solid black;">
        {#each comments as comment}
        <div class="flex items-center">
          <Avatar initials={comment.user.username} background="bg-primary-500" width="w-9" class="mr-4" />
          <li>{comment.comment}</li>
        


          </div>
        {/each}
   
    </div>
    <br>
     <textarea bind:value={commentInput} class="textarea" rows="1" style="height:5vh;" placeholder=" Gib deinen Kommentar ein"/>
     <button type="button" class="btn variant-filled">Kommentieren</button>
    
      </ul>

    </div>
  </div>

{/if}



<style>
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