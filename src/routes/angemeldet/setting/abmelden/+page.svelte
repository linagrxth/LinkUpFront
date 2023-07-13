<script>
  let checkboxChecked = false;
  let buttonDisabled = true;

  function handleCheckboxChange(event) {
    checkboxChecked = event.target.checked;
    buttonDisabled = !checkboxChecked;
  }

  const userLogout = async () => {
    try {
      const response = await fetch('https://linkup-api.de/api/users/logout', {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });

      if (response.ok) {
        console.log('Erfolgreich abgemeldet');
        console.log(response.status);
        
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';
      } else {
        const warningMessage = document.getElementById('warningMessage');
        warningMessage.style.display = 'block';
        throw new Error('Fehler beim Abmelden');
        
      }
    } catch (error) {
      console.error(error);
    }
    window.location.href = '/nichtangemeldet';
  };

  $: {
    buttonDisabled = !checkboxChecked;
  }
</script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<div class="con" style="display: flex; flex-direction: row;">
  <br>
  <form class="card p-4 flex flex-col gap-3" style="width: 800px; height: 350px;">
    <strong style="font-size: 26px;">Abmelden</strong>
    <label class="flex items-center space-x-2">
      <input class="checkbox" type="checkbox" bind:checked={checkboxChecked} on:change={handleCheckboxChange} />
      <p>Bist du dir sicher, dass dich bei deinem Konto abmelden willst?</p>
    </label>
    <div class="grau">
      <i><i class="fa fa-arrow-right" aria-hidden="true"></i> Du kannst dich beim nächsten Mal wieder ganz normal anmelden. </i>
      <br>
      <i><i class="fa fa-arrow-right" aria-hidden="true"></i> Merke dir nur deine Benutzerdaten für einen reibungslosen Login-Prozess bei deiner nächsten Anmeldung.</i>
    </div>
    <br>
    <button type="button" class="btn variant-filled-primary" disabled={buttonDisabled} on:click={userLogout}>Abmelden</button>
  </form>
</div>

<div id="successMessage" style="display: none; color: green;">Erfolgreich abgemeldet!</div>
<div id="warningMessage" style="display: none; color: red;">Fehler beim abmelden!</div>