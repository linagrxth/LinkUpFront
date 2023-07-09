<script>
  let checkboxChecked = false;
  let buttonDisabled = true;

  function handleCheckboxChange(event) {
    checkboxChecked = event.target.checked;
    buttonDisabled = !checkboxChecked;
  }

  const handleDelete = async () => {
    try {
      const response = await fetch('https://linkup-api.de/users/', {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Benutzer wurde erfolgreich gelöscht');
      } else {
        console.error('Fehler beim Löschen des Benutzers');
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


<div class = "con" style="display: flex; flex-direction: row;">
<br>
	<form class="card p-4 flex flex-col gap-3"style="width: 800px; height: 350px;border: 1px solid #b4e2ff;">
    <p><strong>Konto löschen</strong></p>
    <textarea class="textarea" rows="4" placeholder=" Warum möchtest du deinen Account löschen?" />
  <label class="flex items-center space-x-2">
		<input class="checkbox" type="checkbox" bind:checked={checkboxChecked} on:change={handleCheckboxChange} />
		<p>Bist du dir sicher, dass du deinen LinkUp-Account löschen willst?</p>
	</label>
  <div class = "grau">
        <i><i class="fa fa-arrow-right" aria-hidden="true"></i> Das Löschen deines Accounts ist endgültig und kann nicht unwirksam gemacht werden. </i>
        <br>
        <i><i class="fa fa-arrow-right" aria-hidden="true"></i> Du kannst dir allerdings jederzeit einen neuen Account bei uns erstellen. </i>
    </div>
    <br>
  <button type="button" class="btn variant-filled-primary" disabled={buttonDisabled} on:click={handleDelete}>Konto löschen</button>
    
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

