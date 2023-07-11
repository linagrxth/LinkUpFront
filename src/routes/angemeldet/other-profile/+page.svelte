<script lang="ts">
  import { onMount } from 'svelte';
  import { Avatar, Modal, modalStore } from '@skeletonlabs/skeleton';
  import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton'
  import { createEventDispatcher } from 'svelte';

  let posts = [];
  let selectedPostId = null;
  let comments = [];
  let userData = null;
  let commentInput='';
  let tabSet = 0;
  let userId = '';

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
   // Objekt für den aktuellen Benutzer


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
        posts = await response.json();
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
        const commentsData = await response.json();
        comments = [...commentsData]; // Kopie der Kommentare erstellen
      } else {
        throw new Error('Fehler beim Abrufen der Kommentare');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostClick = async (postId: number) => {
    selectedPostId = postId;
    await getPostComments(postId);
    dispatch('openModal');
  };

  onMount(async () => {
    try {
    const params = new URLSearchParams(window.location.search);
		userId = params.get('username');
    if (userId.startsWith('$')) {
      userId = userId.substring(1);
      }
        await fetchUserData(userId);
        await getPosts(userId);
      }
     catch (error) {
      console.error(error);
    }
  });

  const dispatch = createEventDispatcher();

  function formatiereDatum(apiDatum: Date) {
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
        <span>@{userData.username}</span>
      </div>
    </div>
    <div style="margin-top: 3vh; margin-bottom: 3vh;">{userData.bio}</div>
    <div class="counts">
      <span><span class="count">{userData.numberFollowers}</span>Followers</span>
      <span><span class="count">{userData.numberFollowing}</span>Followed</span>
    </div>
    <a href="setting/profilsetting">
      <button type="button" class="btn btn-sm variant-ghost-primary self-end">Profil bearbeiten</button>
    </a>
    <br><br>
  {/if}
</div>
    
<TabGroup justify="justify-center" padding="px-20 py-3">
	<Tab bind:group={tabSet} name="tab1" value={0}>Posts</Tab>
	<Tab bind:group={tabSet} name="tab2" value={1}>Followers</Tab>
	<Tab bind:group={tabSet} name="tab3" value={2}>Following</Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		{#if tabSet == 0}	
        <div class="con" style="display: flex; flex-direction: row;">
  <div class="bg-secondary-400 card p-4 max-h-[260px] overflow-auto space-y-4" style="border: 2px solid black; border-radius: 10px;">
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