<script>
  let checkboxChecked = false;
  let buttonDisabled = true;

  function handleCheckboxChange(event) {
    checkboxChecked = event.target.checked;
    buttonDisabled = !checkboxChecked;
  }

  function handleButtonClick() {
    // Führen Sie die Weiterleitung zur gewünschten Seite durch
    window.location.href = '/'; // Ersetzen Sie '/ziel-seite' durch den tatsächlichen Pfad zu Ihrer Zielseite
  }


  $: {
    buttonDisabled = !checkboxChecked;
  }
</script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">


<div class = "con" style="display: flex; flex-direction: row;">
<br>
	<form class="card p-4 flex flex-col gap-3"style="width: 800px; height: 350px;">
    <strong style="font-size: 26px;">Abmelden</strong>
  <label class="flex items-center space-x-2">
		<input class="checkbox" type="checkbox" bind:checked={checkboxChecked} on:change={handleCheckboxChange} />
		<p>Bist du dir sicher, dass dich bei deinem Konto abmelden willst?</p>
	</label>
  <div class = "grau">
        <i><i class="fa fa-arrow-right" aria-hidden="true"></i> Du kannst dich beim nächsten Mal wieder ganz normal anmelden. </i>
        <br>
        
        <i><i class="fa fa-arrow-right" aria-hidden="true"></i> Merke dir nur deine Benutzerdaten für einen reibungslosen Login-Prozess bei deiner nächsten Anmeldung.</i>
    </div>
    <br>
  <button type="button" class="btn variant-filled-primary" disabled={buttonDisabled} on:click={handleButtonClick}>Abmelden</button>
    
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

