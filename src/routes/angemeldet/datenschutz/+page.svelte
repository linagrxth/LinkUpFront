<script lang="ts">
    import { TabGroup, Tab } from '@skeletonlabs/skeleton';
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
    let tabSet: number = 0;

</script>



<div class="Tabs">
<TabGroup justify="justify-center" padding="px-10 py-3">
	<Tab bind:group={tabSet} name="tab1" value={0}><strong>Datenschutzrichtlinien</strong></Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
        <Accordion autocollapse>
	<AccordionItem>
        <svelte:fragment slot="summary">Erfasste Daten</svelte:fragment>
		<svelte:fragment slot="content"><em>Wir können die folgenden Arten von personenbezogenen Daten erfassen:
        <li>Name, E-Mail-Adresse und Kontaktdaten</li>
        <li>Demografische Informationen</li>
        <li>Informationen über Ihre Nutzung unserer Webseite oder Dienste</li>
        <li>Sonstige Informationen, die Sie uns freiwillig zur Verfügung stellen</li></em></svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="summary">Verwendung der erfassten Daten</svelte:fragment>
		<svelte:fragment slot="content"><em>Wir verwenden die erfassten Daten, um:
        <li>Ihnen unsere Dienste zur Verfügung zu stellen und Ihre Anfragen zu bearbeiten</li>
        <li>Unsere Webseite und Dienste zu verbessern und anzupassen</li>
        <li>Ihnen relevante Informationen, Angebote oder Mitteilungen zukommen zu lassen</li></em></svelte:fragment>
	</AccordionItem>
    <AccordionItem>
		<svelte:fragment slot="summary">Datenweitergabe an Dritte</svelte:fragment>
		<svelte:fragment slot="content"><em>Wir geben Ihre personenbezogenen Daten nicht ohne Ihre ausdrückliche Zustimmung an Dritte weiter, es sei denn, es besteht eine gesetzliche Verpflichtung oder dies ist zur Erfüllung 
    unserer vertraglichen Verpflichtungen erforderlich.</em></svelte:fragment>
	</AccordionItem>
    <AccordionItem>
		<svelte:fragment slot="summary">Datensicherheit</svelte:fragment>
		<svelte:fragment slot="content"><em>Wir setzen angemessene technische und organisatorische Maßnahmen ein, um Ihre personenbezogenen Daten vor unbefugtem Zugriff, Verlust oder Diebstahl zu schützen.</em></svelte:fragment>
	</AccordionItem>
    <AccordionItem>
		<svelte:fragment slot="summary">Ihre Rechte</svelte:fragment>
		<svelte:fragment slot="content"><em>Sie haben das Recht, auf Ihre personenbezogenen Daten zuzugreifen, sie zu berichtigen, zu aktualisieren oder zu löschen. Bitte kontaktieren Sie uns dazu über die angegebenen Kontaktdaten.</em> </svelte:fragment>
	</AccordionItem>
</Accordion>
	</svelte:fragment>
</TabGroup>
			
</div>

