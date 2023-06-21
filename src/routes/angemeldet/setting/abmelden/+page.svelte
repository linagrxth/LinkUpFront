<script lang="ts">
    import { SlideToggle } from '@skeletonlabs/skeleton';
</script>


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<div class = "con" style="display: flex; flex-direction: row;">
<br>
	<form class="card p-4 flex flex-col gap-3"style="width: 800px; height: 350px;border: 1px solid #b4e2ff;">
    <p><strong>Abmelden bei LinkUp</strong></p>
        <label class="flex items-center space-x-2">
		<input class="checkbox" type="checkbox"  />
		<p>Bist du dir sicher, dass du dich abmelden möchtest?</p>
	</label>
    <div class = "grau">
    <p>Du kannst dich beim nächsten Mal ganz normal wieder anmelden. </p>
    <p>Merke dir nur deine Benutzerdaten für einen reibungslosen Login-Prozess bei deiner nächsten Anmeldung. </p>
    </div>
    <button type="button" class="btn variant-filled-primary">Abmelden</button>
	</form>
</div>



<style>
	
    .card {
		margin-bottom: 20px; 
        margin: 20px;
	}



    .con strong{
        font-size: 20px;
    }

     .textarea{
        border: 1px solid grey;
		border-radius: 10px;
    }

    .abstand{
        margin: 10px;
    }

    .checkbox{
        border: 1px solid grey;
		border-radius: 10px;
    }

     .grau{
        color: grey;
        font-size: 12px;
    }



    
</style>
