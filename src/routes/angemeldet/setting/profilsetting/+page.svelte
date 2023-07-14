<script lang="ts">
  import { onMount } from "svelte";
  import { validateUserSynchronously, onMountUserValidation } from '../../../util/reroute.ts';

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
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';
        window.location.href = '/angemeldet/my-profile';
      } else {
        const warningMessage = document.getElementById('warningMessage');
        warningMessage.style.display = 'block';
        throw new Error('Fehler beim Ändern der Userdaten');
      }
    } catch (error) {
      console.error(error);
    }
  };

  onMount(async () => {
    //await onMountUserValidation('https://linkup-api.de/api/users/validate','', '../../../nichtangemeldet');
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
      <input bind:value={username} class="input" title="Input (text)" type="text" placeholder="{currentUser.username}" />
    </label>
    <label class="label">
      <span>&nbsp;&nbsp;Name</span>
      <input bind:value={name} class="input" title="Input (text)" type="text" placeholder="{currentUser.name}" />
    </label>
    <label class="label">
      <span>&nbsp;&nbsp;Biografie</span>
      <textarea bind:value={bio} class="textarea" rows="4" placeholder="{currentUser.bio}" />
    </label>
    <button type="button" class="btn variant-filled-primary" on:click={updateUser}>Änderungen speichern</button>
  </form>
</div>

<div id="successMessage" style="display: none; color: green;">Userdaten wurde erfolgreich geändert!</div>
<div id="warningMessage" style="display: none; color: red;">Beim Ändern der Userdaten ist ein Fehler aufgetreten! Bitte aktualisiere alle Daten.</div>

<style>
  .card {
    margin-bottom: 20px;
    margin: 20px;
  }

  .con strong {
    font-size: 25px;
  }

  .textarea {
    border: 1px solid grey;
    border-radius: 10px;
  }
</style>
