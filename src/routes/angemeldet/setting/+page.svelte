<script lang="ts">
    import { SlideToggle } from '@skeletonlabs/skeleton';

	let faq = [
    { question: 'Frage 1', answer: 'Antwort 1' },
    { question: 'Frage 2', answer: 'Antwort 2' },
    { question: 'Frage 3', answer: 'Antwort 3' }
  ];
</script>


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<div class = "con" style="display: flex; flex-direction: row;">
<br>
	<form class="card p-4 flex flex-col gap-3"style="width: 800px; height: 350px;border: 1px solid #b4e2ff;">
    <p><strong>Die häufigsten Fragen</strong></p>
    <div class="space-y-2">
		<div>
  {#each faq as { question, answer }}
    <div>
      <h3>{question}</h3>
      <p>{answer}</p>
    </div>
  {/each}
</div>
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
