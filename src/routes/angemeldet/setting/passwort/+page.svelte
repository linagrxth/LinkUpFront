<script lang="ts">
    import { SlideToggle } from '@skeletonlabs/skeleton';
</script>


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<div class = "con" style="display: flex; flex-direction: row;">
<br>
	<form class="card p-4 flex flex-col gap-3"style="width: 800px; height: 350px;border: 1px solid #b4e2ff;">
		<p><strong>Ändere dein Passwort</strong></p>
            <label class="label">
	            <span>&nbsp;&nbsp;altes Passwort</span>
	            <input class="input" title="Input (text)" type="text" placeholder=" ******" />
            </label>
            <label class="label">
	            <span>&nbsp;&nbsp;neues Passwort</span>
	            <input class="input" title="Input (text)" type="text" placeholder=" ******" />
            </label>
            <label class="label">
	            <span>&nbsp;&nbsp;neues Passwort wiederholen</span>
	            <input class="input" title="Input (text)" type="text" placeholder=" ******" />
            </label>
            <button type="button" class="btn variant-filled-primary">Passwort ändern</button>
	</form>
</div>



<style>
	




    .con strong{
        font-size: 20px;
    }



    
</style>
