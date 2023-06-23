<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';

	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,700,1,0" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

<nav class="list-nav p-4">
	<ul>
		<li><a href="/angemeldet/" on:click={drawerClose} style="margin-bottom: 25px;">
			<span class="material-symbols-outlined" style="margin-right: 10px;">home</span>Home</a></li>
		<li><a href="/angemeldet/search" on:click={drawerClose} style="margin-bottom: 25px;">
			<span class="material-symbols-outlined" style="margin-right: 10px;">search</span>Search</a></li>
		<li><a href="/angemeldet/explore" on:click={drawerClose} style="margin-bottom: 25px;">
			<span class="material-symbols-outlined" style="margin-right: 10px;">explore</span>Explore</a></li>
		<li><a href="/?notifications" on:click={drawerClose} style="margin-bottom: 25px;">
			<span class="material-symbols-outlined" style="margin-right: 10px;">notifications_active</span>Notifications</a></li>
        <li><a href="/angemeldet/messages" on:click={drawerClose} style="margin-bottom: 25px;">
			<span class="material-symbols-outlined" style="margin-right: 10px;">mail</span>Messages</a></li>
        <li><a href="/angemeldet/setting" on:click={drawerClose}>
			<span class="material-symbols-outlined" style="margin-right: 10px;">settings</span>Settings</a></li>
	</ul>
</nav>

<style>
	.material-symbols-outlined {
	  font-variation-settings:
	  'FILL' 1,
	  'wght' 700,
	  'GRAD' 0,
	  'opsz' 80
	}
</style>