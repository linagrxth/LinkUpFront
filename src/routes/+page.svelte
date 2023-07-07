
<script lang="ts">
    import { TabGroup, Tab } from '@skeletonlabs/skeleton';
    import { Stepper, Step } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
    let tabSet: number = 0;
	import { fly } from 'svelte/transition';

  let isVisible = false;

  function toggleVisibility() {
    isVisible = !isVisible;
  }


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


	import '@skeletonlabs/skeleton/styles/all.css';
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


<AppShell slotSidebarLeft="w-0 md:w-52 bg-surface-500/10">
	<svelte:fragment slot="header">
	<div class = "shadow">
		<AppBar>
			<svelte:fragment slot="lead">
				
				<img src="https://byrio.org/wp-content/uploads/2018/06/BYRIO-Big-Round-1024x1024.png" alt="Beschreibung des Bildes" width="55" height="55">
				<strong class="text-xl uppercase" style="font-family: Tahoma, Geneva, sans-serif;">LinkUp</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
				
				
			</svelte:fragment>
		</AppBar>
		</div>
	</svelte:fragment>
				
	<div class="container p-8 mx-auto">
		<TabGroup justify="justify-center" padding="px-10 py-3">
	<Tab bind:group={tabSet} name="tab1" value={0}><h2><strong><i class="fa fa-arrow-down" aria-hidden="true"></i> Willkommen bei LinkUp <i class="fa fa-arrow-down" aria-hidden="true"></i></strong></h2></Tab>
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			<div class = "null">
				<br>
        		<label><i class="fa fa-thumbs-o-up "style="color: green;"></i>&emsp; Poste deine eigenen Beiträge</label>
        		<br>
        		<label><i class="fa fa-user-o "style="color: purple;"></i>&emsp; Schau dir Beiträge anderer Leute an</label>
        		<br>
        		<label><i class="fa fa-send-o " style="color: blue;"></i>&emsp; Kommuniziere mit anderen Usern</label>
        		<br>
        		<label><i class="fa fa-star-o" style="color: red;"></i>&emsp; Folge deinen Freunden</label>
        		<br>
                <br>
				<a href="/nichtangemeldet" class="btn variant-filled">
					<span>Let's go!</span>
	                <span><i class="fa fa-arrow-right" aria-hidden="true"></span>
	               
                </a><span style="opacity: 0.0;">ichmussss</span>

			</div>
			
            

			
		{/if}

	</svelte:fragment>
	
</TabGroup>
	</div>

	<svelte:fragment slot="footer">
		<div class = "foot">
    		<a href="/nichtangemeldet/impressum2">Impressum</a>
    		<a href="/nichtangemeldet/datenschutz2">Datenschutz</a>
    		<a href="/nichtangemeldet/nutzungsrichtlinien2">Nutzungsrichtlinien</a>
  		<p>&copy; {year} LinkUp. Alle Rechte vorbehalten.</p>
		</div>
	</svelte:fragment>
</AppShell>



<div class="card">
	<header class="card-header">(header)</header>
	<section class="p-4">(content)</section>
	<footer class="card-footer">(footer)</footer>
</div>


<br>
<br>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<div class="Tabs">
<TabGroup justify="justify-center" padding="px-10 py-3">
	<Tab bind:group={tabSet} name="tab1" value={0}><strong>Willkommen bei LinkUp</strong></Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			<div class = "null">
				<br>
        		<label><i class="fa fa-thumbs-o-up "style="color: green;"></i>&emsp; Poste deinen eigenen Beiträge</label>
        		<br>
        		<label><i class="fa fa-user-o "style="color: purple;"></i>&emsp; Schau dir Beiträge aller Leute an</label>
        		<br>
        		<label><i class="fa fa-send-o " style="color: blue;"></i>&emsp; Kommuniziere mit deinen Freunden</label>
        		<br>
        		
        		<br>
                <br>
                <a href="/nichtangemeldet" class="btn variant-filled">
	                <span><i class="fa fa-arrow-right" aria-hidden="true"></span>
	                <span>Let</span>
                </a>&emsp;&emsp;&emsp;Hallo
				<a>Hallo</a>
			</div>
            

			
		{/if}
	</svelte:fragment>
</TabGroup>
			
</div>
<style>



	.null{
		
        
        text-align: center;
	}


	.btn{
		margin-left: 90px;
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

