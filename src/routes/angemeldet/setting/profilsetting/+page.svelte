<script lang="ts">
    import { TabGroup, Tab } from '@skeletonlabs/skeleton';
    let tabSet: number = 0;
    import { onMount, onDestroy } from 'svelte/internal';
  	import { Avatar } from '@skeletonlabs/skeleton';

    import { Stepper, Step } from '@skeletonlabs/skeleton';

	import { goto } from '$app/navigation';



	let showLogin = true;
  let showRegister = false;
  let email = '';
  let name = '';
  let username = '';
  let password = '';
  let agreeToTermsDR = false;
  let agreeToTermsNR = false;


  function handleLogin() {
    console.log('Einloggen mit', email, 'und', password);
  }

  let selectedImage;
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
    password: ''
  };

  function saveChanges() {
    // Hier kannst du die Logik implementieren, um die Änderungen am Profil zu speichern
    // Zum Beispiel: eine API-Anfrage senden, um das Profil in der Datenbank zu aktualisieren

    // Aktualisiere das userProfile-Objekt mit den neuen Daten
    userProfile = { ...editedProfile };

    // Zeige eine Erfolgsmeldung oder leite den Benutzer auf eine andere Seite um
    alert('Die Änderungen wurden erfolgreich gespeichert.');
  }
  
  // Optional: Füge diese Funktion hinzu, um das Formular zurückzusetzen
  function resetForm() {
    editedProfile = { ...userProfile };
  }
  
  // Optional: Verhindere das Verlassen der Seite ohne Bestätigung
  onMount(() => {
    const beforeUnloadHandler = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };
    
    window.addEventListener('beforeunload', beforeUnloadHandler);
    
    onDestroy(() => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
    });
  });

</script>



<div class="Tabs">
<TabGroup justify="justify-center" padding="px-10 py-3">
	<Tab bind:group={tabSet} name="tab1" value={0}><strong>Profil ändern</strong></Tab>
	<Tab bind:group={tabSet} name="tab2" value={1}><strong>Passwort ändern</strong></Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
        <div class = "con" style="display: flex; flex-direction: row;">
        <br>
	        <form class="card p-4 flex flex-col gap-3"style="width: 800px; height: 440px;border: 1px solid #b4e2ff;">
            <p><strong>Verändere dein Profil</strong></p>
            <label class="label">
	    <span>&nbsp;&nbsp;Benutzername</span>
	    <input class="input" title="Input (text)" type="text" placeholder=" {userProfile.username}" />
    </label>

    <label class = "label">
		<span>&nbsp;&nbsp;Biografie</span>
        <textarea class="textarea" rows="4" placeholder=" {userProfile.bio}" />
	</label>
    						<label class = "label">
						<span>Zeige den Leuten dein Lächeln</span>
          					<input class="input" type="file" on:change={handleFileInput} />

							{#if selectedImage}
  								<Avatar src={selectedImage} width="w-16" rounded="rounded-full" />
							{/if}
						</label>
    <button type="button" class="btn variant-filled-primary">Änderungen speichern</button>
	        </form>
        </div>
		{:else if tabSet == 1}
        <div class = "con" style="display: flex; flex-direction: row;">
        <br>
	        <form class="card p-4 flex flex-col gap-3"style="width: 800px; height: 360px;border: 1px solid #b4e2ff;">
            <p><strong>Ändere dein Passwort</strong></p>
            <label class="label">
	            <span>&nbsp;&nbsp;altes Passwort</span>
	            <input class="input" title="Input (text)" type="text" placeholder=" ******" />
            </label>
            <label class="label">
	            <span>&nbsp;&nbsp;neues Passwort</span>
	            <input class="input" title="Input (text)" type="text" placeholder=" ******" />
            </label>
            <label class="label">
	            <span>&nbsp;&nbsp;neues Passwort wiederholen</span>
	            <input class="input" title="Input (text)" type="text" placeholder=" ******" />
            </label>
            <button type="button" class="btn variant-filled-primary">Passwort ändern</button>

	        </form>
        </div>
		{/if}
	</svelte:fragment>
</TabGroup>
	
</div>

<style>



   .card {
		margin-bottom: 20px; 
        margin: 20px;
	}



    .con strong{
        font-size: 20px;
    }

    .input{
        border: 1px solid #D8D8D8;
		border-radius: 10px;
    }

    .textarea{
        border: 1px solid #D8D8D8;
		border-radius: 10px;
        height: 70px;
    }




</style>
