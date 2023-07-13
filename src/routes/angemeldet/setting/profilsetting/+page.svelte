<script lang="ts">
    import { onMount } from "svelte";
    let tabSet: number = 0;
  
    let bio = '';
    let birthDate = '';
    let image = '';
    let name = '';    
    let username = '';
    let currentUser = {};

    const getCurrentUser = async () => {
  try {
    const response = await fetch('https://linkup-api.de/api/users/current', {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (response.ok) {
      currentUser = await response.json();
    } else {
      throw new Error('Fehler beim Abrufen des aktuellen Benutzers');
    }
  } catch (error) {
    console.error(error);
  }
};

const deletePost = async (postID) => {

try {
    const response = await fetch(`https://linkup-api.de/api/posts/${postID}`, {
    mode: 'cors',
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include',
});

if (response.ok) {
  console.log('Post wurde gelöscht');
  console.log(response.status);
} else {
  throw new Error('Fehler beim Löschen des Posts');
}
} catch (error) {
  console.error(error);
}
};
  
    const updateUser = async () => {
    const userData = {
        bio: bio,
        birthDate: birthDate,
        image: image, 
        name: name,
        username: username
    };

    try {
      const response = await fetch('https://linkup-api.de/api/users', {
        mode: 'cors',
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        console.log('Userdaten erfolgreich geändert');
        console.log(response);
      } else {
        throw new Error('Fehler beim Ändern der Userdaten');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  /*function onCompleteHandler(e: CustomEvent): void {
      goto('/layer');
  }*/

  /*function resetForm() {
    editedProfile = { ...userProfile };
  }*/

  onMount(async () => {
    try {
      await getCurrentUser();
    } catch (error) {
      console.error(error);
    }
  });
  </script>
  


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<div class="con" style="display: flex; flex-direction: row;">
    <br>
    <form class="card p-4 flex flex-col gap-3" style="width: 800px; height: 470px;">
        <strong style="font-size: 26px;">Verändere dein Profil</strong>
    <label class="label">
      <span>&nbsp;&nbsp;Benutzername</span>
      <input bind:value={username} class="input" title="Input (text)" type="text" placeholder= " maxi" />
    </label>
    <label class="label">
      <span>&nbsp;&nbsp;Name</span>
      <input bind:value={name} class="input" title="Input (text)" type="text" placeholder= " Max" />
    </label>
    <label class="label">
      <span>&nbsp;&nbsp;Biografie</span>
      <textarea bind:value={bio} class="textarea" rows="4"/>
    </label>
    <button type="button" class="btn variant-filled-primary" on:click={updateUser}>Änderungen speichern</button>
    </form>
  </div>
  



<style>
	
.card {
		margin-bottom: 20px; 
        margin: 20px;
	}

    .con strong{
        font-size: 25px;
    }

     .textarea{
        border: 1px solid grey;
		border-radius: 10px;
    }



    
</style>