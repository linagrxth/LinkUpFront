<script>
  import { onMount } from 'svelte';
  import { validateUserSynchronously, onMountUserValidation } from '../../../util/reroute.ts';

  let checkboxChecked = false;
  let buttonDisabled = true;

  onMount(async () => {
    //await onMountUserValidation('https://linkup-api.de/api/users/validate','', '../../../nichtangemeldet');
  });

  function handleCheckboxChange(event) {
    checkboxChecked = event.target.checked;
    buttonDisabled = !checkboxChecked;
  }

  const userDelete = async () => {
    try {
      const response = await fetch('https://linkup-api.de/api/users', {
        mode: 'cors',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });

      if (response.ok) {
        console.log('Konto erfolgreich gelöscht');
        console.log(response.status);
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';
      } else {
        const warningMessage = document.getElementById('warningMessage');
        warningMessage.style.display = 'block';
        throw new Error('Fehler beim Löschen des Users');
      }
    } catch (error) {
      console.error(error);
    }
    window.location.href = '/';
  };

  $: {
    buttonDisabled = !checkboxChecked;
  }
</script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<div class="con" style="display: flex; flex-direction: row;">
  <br>
  <form class="card p-4 flex flex-col gap-3" style="width: 800px; height: 420px;">
    <strong style="font-size: 26px;">Konto löschen</strong>
    <textarea class="textarea" rows="4" placeholder=" Warum möchtest du deinen Account löschen?"></textarea>
    <label class="flex items-center space-x-2">
      <input class="checkbox" type="checkbox" bind:checked={checkboxChecked} on:change={handleCheckboxChange} />
      <p>Bist du dir sicher, dass du deinen LinkUp-Account löschen willst?</p>
    </label>
    <div class="grau">
      <i><i class="fa fa-arrow-right" aria-hidden="true"></i> Das Löschen deines Accounts ist endgültig und kann nicht rückgängig gemacht werden.</i>
      <br>
      <i><i class="fa fa-arrow-right" aria-hidden="true"></i> Du kannst dir jedoch jederzeit einen neuen Account bei uns erstellen.</i>
    </div>
    <br>
    <button type="button" class="btn variant-filled-primary" disabled={buttonDisabled} on:click={userDelete}>Konto löschen</button>
  </form>
</div>

<div id="successMessage" style="display: none; color: green;">Account wurde erfolgreich gelöscht!</div>
<div id="warningMessage" style="display: none; color: red;">Beim Account löschen ist ein Fehler aufgetreten!</div>

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

  .abstand {
    margin: 10px;
  }

  .checkbox {
    size: 20px;
    border: 1px solid grey;
    border-radius: 10px;
  }

  .grau {
    color: grey;
    font-size: 12px;
  }
</style>
