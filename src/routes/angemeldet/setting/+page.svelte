<script lang="ts">
    import { SlideToggle } from '@skeletonlabs/skeleton';
</script>


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<div class = "con" style="display: flex; flex-direction: row;">
<br>
	<form class="card p-4 flex flex-col gap-3"style="width: 800px; height: 350px;border: 1px solid #b4e2ff;">
    <p><strong>Wer darf mich kontaktieren?</strong></p>
    <div class="space-y-2">
	    <label class="flex items-center space-x-2">
		    <input class="checkbox" type="checkbox" checked />
		    <p>Freunde</p>
	    </label>
	    <label class="flex items-center space-x-2">
		    <input class="checkbox" type="checkbox" />
		    <p>Kontakte</p>
	    </label>
	    <label class="flex items-center space-x-2">
		    <input class="checkbox" type="checkbox" />
		    <p>Öffentlichkeit</p>
	    </label>
    </div>
	</form>
</div>



<style>
	
    .card {
		margin-bottom: 20px; 
        margin: 20px;
	}



    .con strong{
        font-size: 20px;
    }



    
</style>
