<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { Avatar } from '@skeletonlabs/skeleton';

  let id = 1;
  export let user = 'Klara';
  export let createdAt = '12-09-2023';

  const initialData = [
    {
      id: id++,
      user: user,
      createdAt: createdAt,
      content: 'Das ist der Start',
      isFavorite: false,
      likes: 5,
    }
  ];

  export const posts = writable(initialData);
  export let writing = '';

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

  });
</script>

<!-- Der restliche HTML-Code bleibt unverändert -->




<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<div class = "con" style="display: flex; flex-direction: row;">
<br>
	<form class="card p-4 flex flex-col gap-3"style="width: 400px; height: 250px;border: 1px solid #b4e2ff;">
		<p><strong>Erstelle einen Post</strong></p>
		<textarea bind:value={writing} class="textarea" rows="4" placeholder="Dein Post..." />
		<button type="button" class="btn variant-ghost-primary self-end" on:click={handlePost}>Posten</button>
	</form>


<div class="cardi" style= "width: 600px; height: 500px;">

    <div class="card p-4 max-h-[480px] overflow-auto space-y-4" style = "border: 1px solid #b4e2ff;">
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
			<button type="button" class="btn-icon !bg-transparent">
				<i class="fa fa-comment-o" aria-hidden="true"></i>
			</button>
		</div>
	</div>
{/each}

</div>
</div>
</div>


<style>
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

    .cardi{

    }


</style>
