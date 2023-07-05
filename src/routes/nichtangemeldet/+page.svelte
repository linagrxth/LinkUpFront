<script lang="ts">
    import { TabGroup, Tab } from '@skeletonlabs/skeleton';
    import { Stepper, Step } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
    let tabSet: number = 0;


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

  	// The ordering of these imports is critical to your app working properly
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import {
		AppBar,
		AppShell,
		Avatar,
		Drawer,
		Modal,
		Toast,
		drawerStore
	} from '@skeletonlabs/skeleton';
	import Navigation from '$lib/components/Navigation.svelte';

	function drawerOpen(): void {
		drawerStore.open();
	}
	import { LightSwitch } from '@skeletonlabs/skeleton';
	export let year = new Date().getFullYear();




</script>




<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<div class="Tabs">
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
					<span>Username</span>
          				<input class="input" title="Name" type="text" placeholder="Gib deinen Nutzernamen ein." />
					</label>
          			<label>
            		<label class = "label">
					<span>Passwort</span>
          				<input class="input" title="Input (password)" type="password" placeholder="Gib dein Passwort ein." />
					</label>
          			<label>
            		<a href="http://localhost:5173/sidebar">Passwort vergessen?</a>
          			</label>
				</div>
				<br>
				<div class = "btn">
				<button type="submit" class="btn variant-filled-primary">
					<span>Einloggen</span>
				</button>
				</div>

				</form>
				</div>
			</div>


		{:else if tabSet === 1}
		<div class = "zwei">
			<div class="card" style="width: 800px; height: 410px;">
			<div class = "abstand">
				<Stepper on:complete={onCompleteHandler}>
					<Step>
						<svelte:fragment slot="header">Nutzerdaten eingeben</svelte:fragment>
						<label class = "label">
						<span>Name</span>
          					<input class="input" title="Name" type="text" placeholder="Gib deinen Namen ein." />
						</label>
            			<label class = "label">
						<span>E-Mail</span>
          					<input class="input" title="Input (email)" type="email" placeholder="john@example.com" autocomplete="email" />
						</label>
						<label class = "label">
						<span>Geburtstag</span>
          					<input class="input" title="Input (date)" type="date" />
						</label>
					</Step>
					<Step>
						<svelte:fragment slot="header">Konto einrichten</svelte:fragment>
						<label class = "label">
						<span>Nutzername</span>
          					<input class="input" title="Name" type="text" placeholder="Gib deinen Nutzernamen ein." />
						</label>
            			<label class = "label">
						<span>Passwort</span>
          					<input class="input" title="Input (password)" type="password" placeholder="Erstelle dein Passwort" />
						</label>
						<label class = "label">
						<span>Passwort wiederholen</span>
          					<input class="input" title="Input (password)" type="password" placeholder="Wiederhole dein Passwort" />
						</label>
					</Step>
					<Step>
						<svelte:fragment slot="header">Biografie schreiben</svelte:fragment>
						<label class = "label">
						<span>Lege deine persönliche Biografie fest</span>
          					<textarea class="textarea" rows="4" placeholder="Erzähle uns was über dich" />
						</label>
					</Step>
					<Step>
						<svelte:fragment slot="header">Profilbild einfügen</svelte:fragment>
						<label class = "label">
						<span>Zeige den Leuten dein Lächeln</span>
          					<input class="input" type="file" on:change={handleFileInput} />

							{#if selectedImage}
  								<Avatar src={selectedImage} width="w-32" rounded="rounded-full" />
							{/if}
						</label>
					</Step>
					<Step>
						<svelte:fragment slot="header">Einverständnis abgeben</svelte:fragment>
						
					<div class="space-y-2">
					<label class="flex items-center space-x-2">
					<input class="checkbox" type="checkbox" />
					<p><a href="/log/datenschutzrichtlinien2">Datenschutzrichtlinien</a> gelesen und akzeptiert.</p>
					</label>
					<label class="flex items-center space-x-2">
					<input class="checkbox" type="checkbox" />
					<p><a href="/log/nutzungsrichtlinien2">Nutzungsrichtlinien</a>  gelesen und akzeptiert.</p>
					</label>
					</div>
					</Step>
				</Stepper>
			</div>
			
			</div>
			</div>
				

			
		{/if}
	</svelte:fragment>
</TabGroup>
			
</div>

<style>
    .hole
	{
		border: 1px solid grey;
		border-radius: 20px;
	}

	.null{
		justify-content: center;
        align-items: center;
        text-align: center;
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

.shadow{
		box-shadow: 0 0 4px 0 rgba(0.9, 0.9, 0.9, 0.2), 0 4px 18px 0 rgba(0, 0, 0, 0.2);
	}

	.foot{
		text-align: center;
		font-size: 13px;
		margin: 0 20px;
	}



</style>
