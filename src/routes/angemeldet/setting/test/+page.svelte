<script lang="ts">
    let tabSet: number = 0;
  	import { Avatar } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

  let email = '';
  let password = '';



  function handleLogin() {
    console.log('Einloggen mit', email, 'und', password);
  }

  let selectedImage: any;
  function handleFileInput(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      selectedImage = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  function onCompleteHandler(e: CustomEvent): void {
      goto('/layer');
  }



  let userProfile = {
    username: 'max123',
    name: 'Max Mustermann',
    photo: 'avatar.jpg',
    email: 'max@example.com',
    bio: 'Ich mag Fische',
    password: ''
  };

  let editedProfile = {
    username: userProfile.username,
    name: userProfile.name,
    photo: userProfile.photo,
    email: userProfile.email,
    password: '',
    bio: ''
  };
  function saveChanges() {
    // Erstelle das Objekt mit den zu aktualisierenden Profildaten
    const updatedProfileData = {
      bio: editedProfile.bio,
      name: editedProfile.name,
      username: editedProfile.username
    };

    // Sende den PATCH-Request an die API
    fetch('https://linkup-api.de/users', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProfileData)
    })
      .then(response => {
        if (response.ok) {
          // Erfolgreiche Aktualisierung
          console.log('Profil erfolgreich aktualisiert');
        } else {
          // Fehler beim Aktualisieren des Profils
          console.error('Fehler beim Aktualisieren des Profils');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  function resetForm() {
    editedProfile = { ...userProfile };
  }

  </script>
  


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<div class="con" style="display: flex; flex-direction: row;">
    <br>
    <form class="card p-4 flex flex-col gap-3" style="width: 800px; height: 470px;border: 1px solid #b4e2ff;">
        <strong style="font-size: 26px;">Verändere dein Profil</strong>
    <label class="label">
      <span>&nbsp;&nbsp;Benutzername</span>
      <input bind class="input" title="Input (text)" type="text" placeholder= " Max" />
    </label>
    <label class="label">
      <span>&nbsp;&nbsp;Biografie</span>
      <textarea bind:value={editedProfile.bio} class="textarea" rows="4" placeholder=" Ich bin 13 Jahre alt und spiele gerne Fußball." />
    </label>
    <label class="label">
      <span>Zeige den Leuten dein Lächeln:</span>
      <br>
      <input type="file" on:change={handleFileInput} style="width: 300px; height: 30px; font-size: 12px;" />


      {#if selectedImage}
        <Avatar src={selectedImage} width="w-16" rounded="rounded-full" />
      {/if}
    </label>
    <button type="button" class="btn variant-filled-primary" on:click={saveChanges}>Änderungen speichern</button>
    </form>
  </div>
  



<style>
	




    .con strong{
        font-size: 20px;
    }



    
</style>