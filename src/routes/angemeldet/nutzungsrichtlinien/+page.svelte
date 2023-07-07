<script lang="ts">
    import { TabGroup, Tab } from '@skeletonlabs/skeleton';
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
    let tabSet: number = 0;
</script>

<div class="Tabs">
<TabGroup justify="justify-center" padding="px-10 py-3">
	<Tab bind:group={tabSet} name="tab1" value={0}><strong>Nutzungsrichtlinien</strong></Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
        <Accordion autocollapse>
	<AccordionItem>
        <svelte:fragment slot="summary">Geistiges Eigentum</svelte:fragment>
		<svelte:fragment slot="content"><em>Alle Rechte des geistigen Eigentums in Bezug auf die Webseite
    oder Anwendung, einschließlich, aber nicht beschränkt auf Urheberrechte, Markenrechte und Patente, liegen bei den Eigentümern der Webseite oder Anwendung. Du stimmst zu, diese Rechte zu respektieren
    und keine Inhalte oder Materialien zu erstellen, zu kopieren, zu modifizieren oder zu verbreiten, die gegen diese Rechte verstoßen.</em></svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="summary">Zugriff und Nutzung</svelte:fragment>
		<svelte:fragment slot="content"><em>Du erhältst Zugriff auf die Webseite oder Anwendung für den persönlichen, nicht kommerziellen Gebrauch. Du stimmst zu, die Webseite oder Anwendung nicht für rechtswidrige Zwecke 
    oder in einer Weise zu nutzen, die gegen diese Richtlinien verstößt. Du bist allein für die Aktivitäten verantwortlich, die mit deinem Konto oder deiner Nutzung der Webseite 
    oder Anwendung in Verbindung stehen.</em></svelte:fragment>
	</AccordionItem>
    <AccordionItem>
		<svelte:fragment slot="summary">Verbotene Aktivitäten</svelte:fragment>
		<svelte:fragment slot="content"><em>Die folgenden Aktivitäten sind ausdrücklich untersagt:

    <li>Das Hochladen, Posten oder Teilen von Inhalten, die rechtswidrig, beleidigend, bedrohlich, diffamierend, obszön oder anderweitig anstößig sind.</li>
    <li>Die Verwendung von automatisierten Systemen, Bots oder anderen Mitteln, um Zugriff auf die Webseite oder Anwendung zu erhalten oder Inhalte abzurufen.</li></em></svelte:fragment>
	</AccordionItem>
    <AccordionItem>
		<svelte:fragment slot="summary">Haftungsbeschränkung</svelte:fragment>
		<svelte:fragment slot="content"><em>Die Webseite oder Anwendung wird "wie besehen" und ohne jegliche Garantien oder Gewährleistungen bereitgestellt. Die Eigentümer der Webseite oder Anwendung übernehmen keine Verantwortung für Schäden 
    oder Verluste, die sich aus der Nutzung der Webseite oder Anwendung ergeben, einschließlich, aber nicht beschränkt auf direkte, indirekte, zufällige oder Folgeschäden.</em></svelte:fragment>
	</AccordionItem>
    <AccordionItem>
		<svelte:fragment slot="summary">Änderungen der Richtlinien</svelte:fragment>
		<svelte:fragment slot="content"><em>Die Eigentümer der Webseite oder Anwendung behalten sich das Recht vor, diese Richtlinien jederzeit zu ändern oder zu aktualisieren.</em> </svelte:fragment>
	</AccordionItem>
    <AccordionItem>
		<svelte:fragment slot="summary">Kontakt</svelte:fragment>
		<svelte:fragment slot="content"><em>Bei Fragen oder Bedenken bezüglich dieser Richtlinien kannst du uns unter +49152 53190738 erreichen.</em></svelte:fragment>
	</AccordionItem>
</Accordion>
	</svelte:fragment>
</TabGroup>			
</div>

