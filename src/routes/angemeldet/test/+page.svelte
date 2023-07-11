<script>
  import { onMount } from 'svelte';

  let postContent = '';

  const handleLogin = async () => {
    const loginData = {
      email: "marcbuddemeier@gmail.com",
      password: "Test123!"
    };

    try {
      const response = await fetch('https://linkup-api.de/api/users/login', {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        console.log('Anmeldung erfolgreich');
        console.log(response.status);
        const responseBody = await response.json();
        console.log(responseBody);
      } else {
        throw new Error('Fehler bei der Anmeldung');
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          content: postContent
        })
      });

      if (response.ok) {
        console.log(response.status);
        const responseBody = await response.json();
        console.log(responseBody);
      } else {
        throw new Error('Fehler beim Erstellen des Posts');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = async () => {
    try {
      await createPost();
      console.log('Post erfolgreich erstellt');
    } catch (error) {
      console.error(error);
    }
  };

  onMount(async () => {
    try {
    } catch (error) {
      console.error(error);
    }
  });
</script>

<div>
  <textarea bind:value={postContent}></textarea>
  <button on:click={handleClick}>Post erstellen</button>
</div>
