<script lang="ts">
  
  let oldPassword = '';
  let newPassword = '';
  
    const handleChangePassword = async () => {
    const PasswortData = {
        newPassword: newPassword,
        oldPassword: oldPassword
    };

    try {
      const response = await fetch('https://linkup-api.de/api/users/updatePassword', {
        mode: 'cors',
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(PasswortData)
      });

      if (response.ok) {
        console.log('Passwort erfolgreich geändert');
        console.log(response);
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';
      } else {
        const warningMessage = document.getElementById('warningMessage');
        warningMessage.style.display = 'block';
        throw new Error('Fehler beim Ändern des Passworts');
       
      }
    } catch (error) {
      console.error(error);
    }
  };
</script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<div class="con" style="display: flex; flex-direction: row;">
  <br>
  <form class="card p-4 flex flex-col gap-3" style="width: 800px; height: 400px;">
    <strong style="font-size: 26px;">Ändere dein Passwort</strong>
    <label class="label">
      <span>&nbsp;&nbsp;altes Passwort</span>
      <input bind:value={oldPassword} class="input" title="Input (text)" type="password" placeholder=" ********" />
    </label>
    <label class="label">
      <span>&nbsp;&nbsp;neues Passwort</span>
      <input bind:value={newPassword} class="input" title="Input (text)" type="password" placeholder=" *******" />
    </label>
    <button on:click={handleChangePassword} type="button" class="btn variant-filled-primary">Passwort ändern</button>
  </form>
</div>

<div id="successMessage" style="display: none; color: green;">Erfolgreich abgemeldet!</div>
<div id="warningMessage" style="display: none; color: red;">Fehler beim abmelden!</div>

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
