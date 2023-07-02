<script lang="ts">
    import { TabGroup, Tab } from '@skeletonlabs/skeleton';
    let tabSet: number = 0;

</script>



<div class="Tabs">
    
<TabGroup justify="justify-center" padding="px-10 py-3">
	<Tab bind:group={tabSet} name="tab1" value={0}><strong>Impressum</strong></Tab>
	<Tab bind:group={tabSet} name="tab2" value={1}><strong>Verantwortlichkeit</strong></Tab>
	<Tab bind:group={tabSet} name="tab3" value={2}><strong>Haftungshinweis</strong></Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			<div class = "impressum">
              <br>
              <p>Privatperson: LinkUp</p>
              <p>Vertretungsberechtigte Personen: Lina Groth </p>
              <p>Straße: Glasuritstraße 2</p>
              <p>PLZ und Ort: 48249 Münster</p>
              <p>Telefon: 015253190738789</p>
              <p>E-Mail: linagrxt@gmx.de</p>
              <p>Website: www.linkup.de</p>
            </div>
		{:else if tabSet === 1}
          <div class = "verantwortlich">
            <br>
			<p>Marc Buddemeier</p>
            <p>Bahnhofstr. 12</p>
            <p>68163 Mannheim</p>
            <br>
            <p>Das ist eine Webseite, die von Studenten innerhalb der Vorlesung "Web-Programmierung" erstellt wurde. <p>
          </div>
		{:else if tabSet === 2}
			<div class = "haftung">
                <br>
                <p>Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
            </div>
		{/if}
	</svelte:fragment>
</TabGroup>
			
</div>

<style>
    .impressum{
        justify-content: center;
        align-items: center;
        text-align: center;
    }


  .verantwortlich{
        justify-content: center;
        align-items: center;
        text-align: center;
  }

  .haftung{
        justify-content: center;
        align-items: center;
        text-align: center;
  }
</style>
