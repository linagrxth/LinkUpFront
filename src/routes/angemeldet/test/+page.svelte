<!DOCTYPE html>
<html>
<div class="con" style="display: flex; flex-direction: row;">
    <br>
    <form class="card p-4 flex flex-col gap-3" style="width: 800px; height: 350px;border: 1px solid #b4e2ff;">
        <p><strong>Abmelden bei LinkUp</strong></p>
        <label class="flex items-center space-x-2">
            <input id="checkbox" class="checkbox" type="checkbox" />
            <p>Bist du dir sicher, dass du dich abmelden möchtest?</p>
        </label>
        <div class="grau">
            <i><i class="fa fa-arrow-right" aria-hidden="true"></i> Du kannst dich beim nächsten Mal ganz normal wieder anmelden.</i>
            <br>
            <i><i class="fa fa-arrow-right" aria-hidden="true"></i> Merke dir nur deine Benutzerdaten für einen reibungslosen Login-Prozess bei deiner nächsten Anmeldung.</i>
        </div>
        <br>
        <button id="abmeldenBtn" class="btn variant-filled-primary" disabled>
            Abmelden
        </button>
        <p id="warnhinweis" style="color: red; font-size: 14px; display: none;">Bitte bestätige die Abmeldung, indem du das Kontrollkästchen aktivierst.</p>
    </form>
</div>

<script>
    const checkbox = document.getElementById('checkbox');
    const abmeldenBtn = document.getElementById('abmeldenBtn');
    const warnhinweis = document.getElementById('warnhinweis');

    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            abmeldenBtn.removeAttribute('disabled');
            warnhinweis.style.display = 'none';
        } else {
            abmeldenBtn.setAttribute('disabled', 'disabled');
            warnhinweis.style.display = 'block';
        }
    });
</script>

</html>