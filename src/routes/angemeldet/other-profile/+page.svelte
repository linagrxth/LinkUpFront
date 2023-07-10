<script lang="ts">
    import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import {Avatar,} from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';  

	let posts = [];
  let selectedPost = null;
  let comments = [];
  let showModal = false;
  let commentInput;
  let tabSet: number = 0;

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
export let writing = '';
  
    onMount(() => {
		const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        createdAt = `${day}.${month}.${year} ${hours}:${minutes}`;});

      
        let dialog: HTMLDialogElement;

        // Funktion zum Öffnen des Modals
        export const openModal = () => {
            showModal = true;
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

  let user2 = null;

  async function fetchUser() {
    const response = await fetch('https://linkup-api.de/api/users/3');
    const data = await response.json();
    user2 = data;
  }


  async function fetchPosts() {
    const response = await fetch('https://linkup-api.de/api/posts/user/3?limit=0&page=0');
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

  fetchUser();

</script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">


<div class="Tabs">

            {#if user2}
<div class="user">
	<Avatar initials={user2.username} background="bg-primary-500" />
	<div class="user-info">
		<span>@{user2.username}</span>
	</div>
</div>

	<div style="margin-top: 3vh; margin-bottom: 3vh;">{user2.bio}</div>
	<div class="counts">
  		<span><span class="count">{user2.numberFollowers}</span>Followers</span>
  		<span><span class="count">{user2.numberFollowing}</span>Followed</span>
	</div>
		<a href = "setting/profilsetting">
	<button type="button" class="btn btn-sm variant-ghost-primary self-end">Profil bearbeiten</button>
	</a>
	<br><br>
{/if}
    
<TabGroup justify="justify-center" padding="px-20 py-3" on:change={handleTabChange}>
	<Tab bind:group={tabSet} name="tab1" value={0}>Posts</Tab>
	<Tab bind:group={tabSet} name="tab2" value={1}>Followers</Tab>
	<Tab bind:group={tabSet} name="tab3" value={2}>Following</Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		{#if tabSet == 0}	
        <div class="centered-content">
<div class = "con" style="display: flex; flex-direction: row;">



    <div class=" bg-secondary-400 card p-4 max-h-[200px] overflow-auto space-y-4" style="border: 2px solid black; border-radius: 10px;">


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

</div>
				

		{:else if tabSet == 1}
			<div class="centered-content" style = "width:400px;">
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