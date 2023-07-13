<script>
    import { AppShell } from '@skeletonlabs/skeleton';
	import NavigationSettings from '$lib/components/NavigationSettings.svelte';
</script>


<AppShell>
	<!-- (header) -->
	<svelte:fragment slot="sidebarLeft">
        <NavigationSettings />
    </svelte:fragment>
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>