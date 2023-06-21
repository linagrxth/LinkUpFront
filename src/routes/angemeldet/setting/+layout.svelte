<script>
    import { AppShell } from '@skeletonlabs/skeleton';
    import Navigation2 from '$lib/components/Navigation2.svelte';
</script>


<AppShell>
	<!-- (header) -->
	<svelte:fragment slot="sidebarLeft">
        <Navigation2 />
    </svelte:fragment>
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>