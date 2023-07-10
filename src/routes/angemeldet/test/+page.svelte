<script>
    import { onMount } from 'svelte';

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
            content: 'Hallo Welt!'
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
  
    onMount(async () => {
    try {
      await handleLogin();
      await createPost();
    } catch (error) {
      console.error(error);
    }
  });
  </script>