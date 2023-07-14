<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton';
  import { onMount } from 'svelte';
  import { validateUserSynchronously, onMountUserValidation } from '../../util/reroute.ts';


 let inputDemo = '';
 let userId = '';
 let filteredUsers: any[] = [];

onMount(async () => {
    //await onMountUserValidation('https://linkup-api.de/api/users/validate','', '../../nichtangemeldet');
  }
 );



  let users = [];

  async function getUsers() {
    try {
      const response = await fetch('https://linkup-api.de/api/users?limit=100&page=1', {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        users = await response.json();
      } else {
        throw new Error('Fehler beim Abrufen der Benutzer');
      }
    } catch (error) {
      console.error(error);
    }
  }

  const deleteFollowing = async (userID) => {
  try {
    // Make the DELETE request
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

    // Update the followedByCurrentUser property
    const userIndex = users.findIndex(user => user.id === userID);
    if (userIndex !== -1) {
      users[userIndex].followedByCurrentUser = false;
    }
  } catch (error) {
    console.error(error);
  }

  await getUsers();
};

const createFollowing = async (userID) => {
  try {
    // Make the POST request
    const response = await fetch(`https://linkup-api.de/api/follows/${userID}`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    });

    if (response.ok) {
      console.log('Freundschaft wurde erstellt');
      console.log(response.status);
    } else {
      throw new Error('Fehler beim Erstellen der Freundschaft');
    }

    // Update the followedByCurrentUser property
    const userIndex = users.findIndex(user => user.id === userID);
    if (userIndex !== -1) {
      users[userIndex].followedByCurrentUser = true;
    }
  } catch (error) {
    console.error(error);
  }

  await getUsers();
};



  onMount(getUsers);


 function initializeFilteredUsers() {
   filteredUsers = users.filter(user =>
     user.username.toLowerCase().includes(inputDemo.toLowerCase())
   );
   getUsers();
 }

 function handleInputChange(event) {
   inputDemo = event.target.value;
   initializeFilteredUsers();
   getUsers();
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
    {#each users as user (user.id)}
      <ul>
        <li class="user-item">
          <a href="/angemeldet/other-profile?username=${encodeURIComponent(user.id)}">
            <span><Avatar initials={user.username} width="w-10"/></span>
            <span class="flex-auto">{user.username}</span>
          </a>
          <div class="follow-button-container">
            <button type="button" class="follow-button btn btn-sm variant-ghost-primary" on:click={() => (user.followedByCurrentUser ? deleteFollowing(user.id) : createFollowing(user.id))}>
              {#if user.followedByCurrentUser}
                Entfolgen
              {:else}
                Folgen
              {/if}
            </button>
          </div>
        </li>
      </ul>
    {/each}
  {:else}
    {#each filteredUsers as user (user.id)}
      <ul>
        <li class="user-item">
          <a href="/angemeldet/other-profile?username=${encodeURIComponent(user.id)}">
            <span><Avatar initials={user.username} width="w-10"/></span>
            <span class="flex-auto">{user.username}</span>
          </a>
          <div class="follow-button-container">
            <button type="button" class="follow-button btn btn-sm variant-ghost-primary" on:click={() => (user.followedByCurrentUser ? deleteFollowing(user.id) : createFollowing(user.id))}>
              {#if user.followedByCurrentUser}
                Entfolgen
              {:else}
                Folgen
              {/if}
            </button>
          </div>
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

 .user-item {
  display: flex;
  align-items: center;
}

.follow-button-container {
  margin-left: auto;
}

.follow-button {
  margin-left: 10px; /* Adjust the margin as needed */
}

</style>
