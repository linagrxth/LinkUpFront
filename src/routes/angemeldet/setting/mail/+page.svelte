<script lang="ts">
    import { SlideToggle } from '@skeletonlabs/skeleton';
</script>


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<div class = "con" style="display: flex; flex-direction: row;">
<br>
	<form class="card p-4 flex flex-col gap-3"style="width: 800px; height: 350px;border: 1px solid #b4e2ff;">
    <p><strong>Konfiguriere deine Benachrichtigungseinstellungen</strong></p>
		<SlideToggle name="slider-label" checked active="bg-primary-500">Bei jedem neuen Follower möchte ich eine E-Mail bekommen.</SlideToggle>
		<SlideToggle name="slider-label" checked active="bg-primary-500">Bei jeder neuen Message möchte ich eine E-Mail bekommen.</SlideToggle>
        <SlideToggle name="slider-label" checked active="bg-primary-500">Bei jedem neuen Like möchte ich eine E-Mail bekommen.</SlideToggle>
        <SlideToggle name="slider-label" checked active="bg-primary-500">Bei jedem neuen Kommentar möchte ich eine E-Mail bekommen.</SlideToggle>
	</form>
</div>



<style>
	




    .con strong{
        font-size: 20px;
    }



    
</style>
