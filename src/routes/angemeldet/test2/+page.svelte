<script>
  import { onMount } from 'svelte';

  let users = [];

  async function getUsers() {
    try {
      const response = await fetch('https://linkup-api.de/api/users', {
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

  function followUser(userId) {
    // Hier kannst du die Logik zum Folgen des Benutzers implementieren
    console.log(`Benutzer mit ID ${userId} folgen`);
  }

  onMount(getUsers);
</script>

<div>
  {#each users as user}
    <div>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Folge ich: {user.followedByCurrentUser}</p>
      <button on:click={() => followUser(user.id)}>Folgen</button>
    </div>
  {/each}
</div>
