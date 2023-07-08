<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';

	function drawerClose(): void {
		drawerStore.close();
	}
</script>


<nav class="list-nav p-4">
	<ul>
		<li><a href="/angemeldet/setting/" on:click={drawerClose} style="margin-bottom: 25px;">Hilfe</a></li>
        <li><a href="/angemeldet/setting/profilsetting" on:click={drawerClose} style="margin-bottom: 25px;">Profileinstellungen</a></li>
        <li><a href="/angemeldet/setting/passwort" on:click={drawerClose} style="margin-bottom: 25px;">Passwort ändern</a></li>
        <li><a href="/angemeldet/setting/abmelden" on:click={drawerClose} style="margin-bottom: 25px;">Abmelden</a></li>
        <li><a href="/angemeldet/setting/löschen" on:click={drawerClose} style="margin-bottom: 25px;">Account löschen</a></li>
	</ul>
</nav>




<style>

	</style>