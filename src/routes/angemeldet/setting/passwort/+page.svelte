<script lang="ts">
    import { SlideToggle } from '@skeletonlabs/skeleton';
  
    let oldPasswordInput: HTMLInputElement;
    let newPasswordInput: HTMLInputElement;
    let newPasswordRepeatInput: HTMLInputElement;
  
    const handleChangePassword = async () => {
      const oldPassword = oldPasswordInput.value;
      const newPassword = newPasswordInput.value;
      const newPasswordRepeat = newPasswordRepeatInput.value;
  
      // Überprüfe, ob das neue Passwort und die Wiederholung übereinstimmen
      if (newPassword !== newPasswordRepeat) {
        console.error('Das neue Passwort stimmt nicht mit der Wiederholung überein');
        return;
      }
  
      // Erstelle das Objekt für den PATCH-Request
      const passwordChangeData = {
        oldPassword,
        newPassword,
      };
  
      // Sende den PATCH-Request an die API
      try {
        const response = await fetch('https://deine-api.com/password', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(passwordChangeData),
        });
        
        if (response.ok) {
          // Erfolgreiche Passwortänderung
          console.log('Passwort wurde erfolgreich geändert');
        } else {
          // Fehler beim Ändern des Passworts
          console.error('Fehler beim Ändern des Passworts');
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
        <input bind:this={oldPasswordInput} class="input" title="Input (text)" type="password" placeholder=" ********" />
      </label>
      <label class="label">
        <span>&nbsp;&nbsp;neues Passwort</span>
        <input bind:this={newPasswordInput} class="input" title="Input (text)" type="password" placeholder=" *******" />
      </label>
      <label class="label">
        <span>&nbsp;&nbsp;neues Passwort wiederholen</span>
        <input bind:this={newPasswordRepeatInput} class="input" title="Input (text)" type="password" placeholder=" *******" />
      </label>
      <button on:click={handleChangePassword} type="button" class="btn variant-filled-primary">Passwort ändern</button>
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

    .abstand{
        margin: 10px;
    }

    .checkbox{
        size: 20px;
        border: 1px solid grey;
		border-radius: 10px;
    }

     .grau{
        color: grey;
        font-size: 12px;
    }





    
</style>