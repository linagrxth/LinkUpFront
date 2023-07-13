<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton';
 import { onMount } from 'svelte';

 export let data;

 let inputDemo = '';
 let filteredUsers: any[] = [];

 onMount(() => {
   initializeFilteredUsers();
 });

 const getFollowers = async (userId) => {
    try {
      const response = await fetch(`https://linkup-api.de/api/users`, {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        const followersData = await response.json();
        followers = followersData;
      } else {
        throw new Error('Fehler beim Abrufen der Follower');
      }
    } catch (error) {
      console.error(error);
    }
  };

 function initializeFilteredUsers() {
   filteredUsers = data.users.filter(user =>
     user.username.toLowerCase().includes(inputDemo.toLowerCase())
   );
 }

 function handleInputChange(event) {
   inputDemo = event.target.value;
   initializeFilteredUsers();
 }

 function toggleFollow(user) {
   user.buttonClicked = !user.buttonClicked;
   if (user.buttonClicked) {
     // Hier können Sie den Follow-Logik-Code implementieren
   } else {
     // Hier können Sie den Unfollow-Logik-Code implementieren
   }

   // Weiterleitung zur Profilseite mit Benutzerinformationen
   window.location.href = `/angemeldet/other-profile?id=${encodeURIComponent(user.username)}`;
 }
</script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<div class="search">
 <input class="input" type="search" name="demo" bind:value={inputDemo} placeholder=" Suchen nach einem User..." on:input={handleInputChange}/>
</div>
<nav class="list-nav">
 {#if inputDemo === ''}
   {#each data.users as user (user.id)}
     <ul>
       <li>
       
         <a href="/angemeldet/other-profile?username=${encodeURIComponent(user.id)}">

           <span><Avatar initials={user.username} width="w-10"/></span>
           <span class="flex-auto">{user.username}</span>
           {#if user.buttonClicked}
             <button type="button" class="btn variant-filled" on:click={() => toggleFollow(user)}>Unfollow</button>
           {:else}
             <button type="button" class="btn variant-filled" on:click={() => toggleFollow(user)}>Follow</button>
           {/if}
         </a>
       </li>
     </ul>
   {/each}
 {:else}
   {#each filteredUsers as user (user.id)}
     <ul>
       <li>
         <a>
           <span><Avatar initials={user.username} width="w-10"/></span>
           <span class="flex-auto">{user.username}</span>
           {#if user.buttonClicked}
             <button type="button" class="btn variant-filled" on:click={() => toggleFollow(user)}>Unfollow</button>
           {:else}
             <button type="button" class="btn variant-filled" on:click={() => toggleFollow(user)}>Follow</button>
           {/if}
         </a>
       </li>
     </ul>
   {/each}
 {/if}
</nav>
<style>
 .search {
   margin-bottom: 2vh;
   
 }

 .list-nav {
   max-height: 490px; /* Adjust the height as needed */
   overflow-y: auto;
 }
</style>
