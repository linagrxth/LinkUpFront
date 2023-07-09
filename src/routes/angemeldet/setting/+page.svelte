<script lang="ts">
    import { SlideToggle } from '@skeletonlabs/skeleton';

	let faq = [
    { question: 'Was mache ich, wenn ich mein Passwort vergessen habe?', answer: 'Beim Einloggenprozess kannst du ganz leicht auf Passwort vergessen drücken. Dann wird dir eine E-Mail zugesendet. Mit dieser Mail kannst du dein Passwort zurücksetzen.' },
    { question: 'Kann ich meinen Account löschen?', answer: 'Du kannst dies unter den Einstellungen machen. Dort gibt es den Punkt Account löschen' },
    { question: 'Gibt es weitere Möglichkeiten, euch zu erreichen und Fragen zu stellen?', answer: 'Wir sind erreichbar unter linagrxth@gmx.de' }
  ];
</script>


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<div class="con" style="display: flex; flex-direction: row">
    <br>
    <form class="card p-4 flex flex-col gap-3" style="display: flex;">
        <strong style="font-size: 26px;">Die häufigsten Fragen</strong>
        <div class="space-y-2" style= "max-height: 350px;overflow: auto;">
            <div>
                {#each faq as { question, answer }}
                <div>
                    <u style="font-size: 18px;">{question}</u>
                    <p><i>-{answer}</i></p>
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
