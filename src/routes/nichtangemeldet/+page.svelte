<script lang="ts">
    import { TabGroup, Tab } from '@skeletonlabs/skeleton';
    import { Stepper, Step } from '@skeletonlabs/skeleton';
    let tabSet: number = 0;
	import '@skeletonlabs/skeleton/styles/all.css';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	export let email = '';
	export let bio = '';
	export let birthDate = '';
	export let image = '';
	export let name = '';
	export let username = '';
	export let password = '';
	let formattedDate = '';

 const handleLogin = async () => {
    const loginData = {
      email: email,
      password: password
    };

    try {
      const response = await fetch('https://linkup-api.de/api/users/login', {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        console.log('Anmeldung erfolgreich');
        console.log(response);
		goto('/angemeldet')
      } else {
        throw new Error('Fehler bei der Anmeldung');
      }
    } catch (error) {
      console.error(error);
    }
  }; 

  let currentUser: {};

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
      const user = await response.json();
      currentUser = user;
    } else {
      const statusCode = response.status;
      console.error('Fehler beim Abrufen des aktuellen Benutzers. HTTP-Statuscode:', statusCode);
    }
  } catch (error) {
    console.error(error);
  }
};

  const displayUserId = () => {
    if (currentUser) {
      console.log('Benutzer-ID:', currentUser.id);
    } else {
      console.log('Aktueller Benutzer nicht verfügbar');
    }
  };

  export const sendResetEmail = async () => {
    const requestBody = {
      email: email
    };
    
    try {
      const response = await fetch('https://linkup-api.de/forgotPassword', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      
      if (response.ok) {
        console.log('Email wurde gesendet')
      }
      else {
		throw new Error('Failed to send reset email');
	  }
    } catch (error) {
      console.error(error);
    }
  };


 /* const handleRegistration =async () => {
	const registrationData = {
		bio: bio,
		birthDate: birthDate,
		email: email,
		image: image,
		name: name,
		password: password,
		username: username
	}

	try {
      const response = await fetch('https://linkup-api.de/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
      });
      
      if (response.ok) {
        console.log('User successfully registrated')
        goto('/angemeldet')
      }
      else {
		throw new Error('Failed to create User');
	  }
    } catch (error) {
      console.error(error);
    }
  };*/


  let selectedImage;

  function handleFileInput(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      selectedImage = e.target.result;
    };

    reader.readAsDataURL(file);
  }

 /* function onCompleteHandler(e: CustomEvent): void {
	const handleRegistration =async () => {
	const registrationData = {
		bio: bio,
		birthDate: birthDate,
		email: email,
		image: image,
		name: name,
		password: password,
		username: username
	}

	try {
      const response = await fetch('https://linkup-api.de/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
      });
      
      if (response.ok) {
        console.log('User successfully registrated')
      }
      else {
		throw new Error('Failed to create User');
	  }
    } catch (error) {
      console.error(error);
    }
  };
  }*/


	function drawerOpen(): void {
		drawerStore.open();
	}
	export let year = new Date().getFullYear();

	export let showModal = false;
        let dialog: HTMLDialogElement;

        // Funktion zum Öffnen des Modals
        export const openModal = () => {
            showModal = true;
        };

        // Funktion zum Schließen des Modals
        export const closeModal = () => {
            showModal = false;
        };

        // Dialog-Element aktualisieren, wenn showModal geändert wird
        $: {
            if (dialog && showModal) dialog.showModal();
        };

        function handleKeyDown(event: { key: string; preventDefault: () => void; }) {
          if (event.key === "Enter") {
            event.preventDefault(); // Verhindert das Standardverhalten des Textbereichs (Zeilenumbruch)
            handleComment();
          }
}
const handleRegistration = async () => {
    const registrationData = {
      bio: bio,
      birthDate: formattedDate,
      email: email,
      image: image,
      name: name,
      password: password,
      username: username
    };

    try {
      const response = await fetch('https://linkup-api.de/api/users/signup', {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(registrationData)
      });

      if (response.ok) {
        console.log('Registrierung erfolgreich');
        console.log(response);
      } else {
        throw new Error('Fehler bei der Registrierung');
      }
    } catch (error) {
      console.error(error);
    }
  };

  function formatBirthDate() {
    const [day, month, year] = birthDate.split('.');
    const date = new Date(`${year}-${month}-${day}`);
    formattedDate = date.toISOString();
  }

  function handleBirthDateInput(event) {
    birthDate = event.target.value;
    formatBirthDate();
  }
</script>




<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<dialog
    bind:this={dialog}
    on:close={() => (showModal = false)}
    on:click|self={() => dialog.close()}
    class="modal">

    <div class="modal-body">
		<h3><strong>Passwort zurücksetzen</strong></h3>
		<br>
    <input bind:value={email} class="input" title="Name" type="text" placeholder=" Gib deine E-Mail ein."  style=" background-color: #E0F2F7;"/>
	<br>
    <div class = "grau">
		<br>
        <p><i class="fa fa-arrow-right" aria-hidden="true"></i> Wir schicken dir dann eine E-Mail zum Zurücksetzen deines Passworts zu. </p>

    </div>
	<br>
     <button type="button" class="btn variant-filled">E-Mail senden</button>

</div>
</dialog>
<div class="Tabs">
<!-- svelte-ignore a11y-label-has-associated-control -->
<TabGroup justify="justify-center" padding="px-10 py-3">
	<Tab bind:group={tabSet} name="tab1" value={0}><strong>Einloggen</strong></Tab>
	<Tab bind:group={tabSet} name="tab2" value={1}><strong>Registrieren</strong></Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
		<div class="eins">
			<div class="card" style="width: 500px; height: 300px;">
 			<br>
        		<form on:submit|preventDefault={handleLogin}>
				<div class = "label1">
					<label class = "label">
					<span>E-Mail</span>
          				<input class="input" title="email" type="email" bind:value={email} placeholder=" Gib deine E-Mail ein." />
					</label>
					<br>
          			<label>
            		<label class = "label">
					<span>Passwort</span>

          				<input class="input" title="Input (password)" type="password" bind:value={password} placeholder=" Gib dein Passwort ein." />

				      	</label>
          			<label>
            		<a href="javascript:void(0)" on:click={openModal} style="display: block; margin-top: 13px; margin-left: 4px;">Passwort vergessen?</a>
					

          			</label>
				</div>
				<br>
				<div class = "btn">
				<button class="btn variant-filled" type="submit">
	                <span>Einloggen</span>
                </button>
				</div>

				</form>
				  <!--<button on:click={getCurrentUser}>Aktuellen Benutzer abrufen</button>
				  <button on:click={displayUserId}>Benutzer-ID anzeigen</button>-->
				  </div>
				  </div>

		{:else if tabSet === 1}
		<div class = "zwei">
			<br>
			<div class = "abstand">

				<!--<Stepper on:complete={onCompleteHandler}>

					<Step>
						<svelte:fragment slot="header">Kontaktdaten eingeben</svelte:fragment>
						<label class = "label">
						<span>Name</span>
          					<input bind:value={name} class="input" title="Name" type="text" placeholder=" Justus Lehmberg" />
						</label>
            			<label class = "label">
						<span>E-Mail</span>
          					<input bind:value={email} class="input" title="Input (email)" type="email" placeholder=" justus.lehmberg@gmx.de" autocomplete="email" />
						</label>
						<label class = "label">
						<span>Geburtstag</span>
          					<input bind:value={birthDate} class="input" title=" date" type="birthdate" />
						</label>
					</Step>
					<Step>
						<svelte:fragment slot="header">Konto einrichten</svelte:fragment>
						<label class = "label">
						<span>Nutzername</span>
          					<input bind:value={username} class="input" title="Name" type="text" placeholder=" Gib deinen Nutzernamen ein" />
						</label>
            			<label class = "label">
						<span>Passwort</span>
          					<input bind:value={password} class="input" title="Input (password)" type="password" placeholder=" Erstelle dein Passwort" />
						</label>
						<label class = "label">
						<span>Passwort wiederholen</span>
          					<input class="input" title="Input (password)" type="password" placeholder=" Wiederhole dein Passwort" />
						</label>
					</Step>
					<Step>
						<svelte:fragment slot="header">Biografie schreiben</svelte:fragment>
						<label class = "label">
						<span>Lege deine persönliche Biografie fest</span>
          					<textarea bind:value={bio} class="textarea" rows="4" placeholder=" Erzähle uns was über dich" />
						</label>
					</Step>
					<Step>
						<svelte:fragment slot="header">Profilbild einfügen</svelte:fragment>
						<label class = "label">
						<span>Zeige den Leuten dein Lächeln</span>
          					<input bind:value={image} class="input" type="file" on:change={handleFileInput} />

							{#if selectedImage}
  								<Avatar src={selectedImage} width="w-32" rounded="rounded-full" />
							{/if}
						</label>
					</Step>
					
				</Stepper>-->

				<form on:submit|preventDefault={handleRegistration}>
					<div class = "card p-4 max-h-[400px] overflow-auto space-y-4">
						<label class = "label">
						<span>Name</span>
							  <input class="input" title="name" type="text" bind:value={name} placeholder=" Gib deinen Namen ein." />
						</label>
						<br>
						<label class = "label">
							<span>E-Mail</span>
								  <input class="input" title="email" type="text" bind:value={email} placeholder=" Gib deine E-Mail ein." />
						</label>
						<br>
						<label class="label">
							<span>Geburtsdatum</span>
							<input class="input" title="birthDate" type="text" bind:value={birthDate} on:input={handleBirthDateInput} placeholder="TT.MM.JJJJ" />
						  </label>
						<br>
						<label class = "label">
							<span>Nutzername</span>
								  <input class="input" title="username" type="text" bind:value={username} placeholder=" Gib deinen Nutzernamen ein." />
						</label>
						<br>
						<label class = "label">
							<span>Passwort</span>
								  <input class="input" title="password" type="password" bind:value={password} placeholder=" Gib ein Passwort ein." />
						</label>
						<br>
						<label class = "label">
							<span>Biografie</span>
							<textarea bind:value={bio} class="textarea" rows="4" placeholder=" Erzähle uns was über dich" />
						</label>
					<br>
					<div class = "btn">
					<button class="btn variant-filled" type="submit">
						<span>Registrieren</span>
					</button>
					</div>
	
					</form>
 <!--<form on:submit|preventDefault={handleRegistration}>
    <label>
      Name:
      <input type="text" bind:value={name} />
    </label>
    <br />
    <label>
      E-Mail:
      <input type="email" bind:value={email} />
    </label>
    <br />
    <label>
      Geburtsdatum:
      <input type="birthdate" bind:value={birthDate} />
    </label>
    <br />
    <label>
      Nutzername:
      <input type="text" bind:value={username} />
    </label>
    <br />
    <label>
      Passwort:
      <input type="password" bind:value={password} />
    </label>
    <br />
    <label>
      Biografie:
      <textarea bind:value={bio} rows="4"></textarea>
    </label>
    <br />
    <br />
    <button type="submit">Registrieren</button>
  </form>
  
--></div>
			
		</div>
				

		{/if}
	</svelte:fragment>
</TabGroup>
			
</div>

<style>

	.modal {
        background-color: white;
		border-radius: 10px; /* Fügt einen abgerundeten Rand hinzu */
  		border: 1px solid #D8D8D8;
}

.grau{
        color: grey;
        font-size: 12px;
    }
    

	.zwei{
		display: flex;
    	justify-content: center;
    	align-items: center;
	}

	.eins{
		display: flex;
    	justify-content: center;
    	align-items: center;
		margin: 10px;
	}

	.label1{
		margin-left: 10px;
		margin-right: 10px;
		margin-buttom: 10px;
	}

	.btn{
		margin-left: 90px;
	}
	
	.abstand{
		margin: 20px;
	}

	.input{
		border: 1px solid #94d6ff;
	}

	.textarea{
		border: 1px solid #94d6ff;
	}

	.checkbox{
		border: 1px solid #94d6ff;
	}




</style>
