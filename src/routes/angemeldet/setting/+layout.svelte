<script>
    import { AppShell } from '@skeletonlabs/skeleton';
	import NavigationSettings from '$lib/components/NavigationSettings.svelte';
</script>


<AppShell>
	<svelte:fragment slot="sidebarLeft">
        <NavigationSettings />
    </svelte:fragment>
	<slot />
</AppShell>