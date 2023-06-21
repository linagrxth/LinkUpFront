<script lang="ts">
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

	<!-- Router Slot -->
	<div class="container p-8 mx-auto">
		<slot />
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
				



<style>
	.shadow{
		box-shadow: 0 0 4px 0 rgba(0.9, 0.9, 0.9, 0.2), 0 4px 18px 0 rgba(0, 0, 0, 0.2);
	}

	.foot{
		text-align: center;
		font-size: 13px;
		margin: 0 20px;
	}

</style>

