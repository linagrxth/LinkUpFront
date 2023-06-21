<script lang="ts">
    import { Autocomplete } from '@skeletonlabs/skeleton';
    import type { AutocompleteOption } from '@skeletonlabs/skeleton';

    let inputDemo = '';
    
    const flavorOptions: AutocompleteOption[] = [
	{ label: 'Vanilla', value: 'vanilla', keywords: 'plain, basic'},
	{ label: 'Chocolate', value: 'chocolate', keywords: 'dark, white'},
	{ label: 'Strawberry', value: 'strawberry', keywords: 'fruit' },
	{ label: 'Neapolitan', value: 'neapolitan', keywords: 'mix, strawberry, chocolate, vanilla'},
	{ label: 'Pineapple', value: 'pineapple', keywords: 'fruit' },
	{ label: 'Peach', value: 'peach', keywords: 'fruit'}
];
	
function onFlavorSelection(event: any): void {
	inputDemo = event.detail.label;
}
							
</script>
<div class="search">
<input class="input" type="search" name="demo"bind:value={inputDemo} placeholder="Search..." />
</div>

<div>
	<Autocomplete bind:input={inputDemo} options={flavorOptions} on:selection={onFlavorSelection} />
</div>

<style>
    .search {
        margin-bottom: 2vh;
    }
</style>