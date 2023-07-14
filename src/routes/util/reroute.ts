export async function validateUserSynchronously(apiEndpoint: string): Promise<any> {
  // Führe hier den API-Aufruf durch und gib das Ergebnis zurück
  const response = await fetch(apiEndpoint);
  console.log(response);
  return response;
}

export async function onMountUserValidation(apiEndpoint: string, successLink: string, unauthorizedLink: string): Promise<void> {
  try {
    const response = await validateUserSynchronously(apiEndpoint); // API-Aufruf
    let status = response.status;
    if(successLink === unauthorizedLink) {
      // Dürfen nicht identisch sein
      console.error("Weiterleitung wegen identischer Links nicht möglich: " + successLink);
      return;
    }
    if (status === 200 && successLink !== '') {
      // Erfolgreicher API-Aufruf
      location.assign(successLink); // Weiterleitung zur autorisierten Seite
    } else if (status === 401 && unauthorizedLink !== '') {
      // Ungültige Autorisierung
      location.assign(unauthorizedLink); // Weiterleitung zur unautorisierten Seite
    } else {
      // Fehlerhafter API-Aufruf
      console.error('Fehler beim API-Aufruf');
      // Weitere Fehlerbehandlung
    }
  } catch (error) {
    console.error('Fehler beim API-Aufruf:', error);
    // Weitere Fehlerbehandlung
  }
}