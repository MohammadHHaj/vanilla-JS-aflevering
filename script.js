
//Lavet Album-objekt, samt strukturen for albummet.
function Album(artistName, albumName, genre, productionYear, tracklist) {
  // Initialisering af Album-objektets egenskaber
  this.artistName = artistName;  // Kunstnerens navn
  this.albumName = albumName;    // Albummets navn
  this.genre = genre;            // Genre af musikken
  this.productionYear = productionYear; // År albumet blev produceret
  this.tracklist = tracklist;    // Liste over numre i albummet
}

//tilføjer album til tabellen
function addAlbumToTable(album){
  console.log('album oprettet', album); //Tjekker hvis der er albummene blev tilføjet korrekt, der burde at være 10.

//Henter tabelBody, fra albumtabellen for at kunne tilføje rækker til den.
const tableBody = document.getElementById("albumTable").getElementsByTagName("tbody")[0];
  console.log("Hentet tabelbody", tableBody); //Tjekker hvis den fanger tbody, der blev oprettet i html.

//Tilføjer en rækkke til tabellen
const newRow = tableBody.insertRow();
console.log('tilføjet række', newRow); //Tjekker at rækken er blevet tilføjet.

//Tilføjer en celle til artistName
const artistCell = newRow.insertCell(0); //Her fortæller jeg at artistcell er celle 0, da 0 er første. 
artistCell.textContent = album.artistName; //det der står i artist cell, skal den hente fra album artistName.

//Tilføjer en celle til albumName
const albumCell = newRow.insertCell(1); 
albumCell.textContent = album.albumName

//Tilføjer en celle til genre
const genreCell = newRow.insertCell(2);
genreCell.textContent = album.genre

//Tilføjer en celle til productionYear
const yearCell = newRow.insertCell(3);
yearCell.textContent = album.productionYear

//Tilføjer en celle til tracklist, med mere information, hvor jeg tilføjer en knap
const trackListCell = newRow.insertCell(4);
const toggleButton = document.createElement('button'); //Oprettelse af knap
trackListCell.appendChild(toggleButton); //Tilføjer knappen til trackListCell
toggleButton.textContent = 'Vis Trackliste' //Tekst til knappen

//Opretter en klik begivenhed for at kunne vise trackList
toggleButton.onclick = function(){
  toggletrackList(toggleButton, album);
}

};
// Denne funktion håndterer visning og skjulning af tracklisten for et album, 
// når der klikkes på den tilknyttede knap. 
// Funktionen henter de nødvendige DOM-elementer, 
function toggletrackList(button, album){
  const trackListBox = document.getElementById("tracklistBox"); // Henter elementet med id 'tracklistBox', som indeholder tracklisten.
  const trackListContent = trackListBox.querySelector(".tracklist-content"); // Henter det specifikke indholdselement for tracklisten inden i trackListBox.


/*Opdatering af knap, så tracklist fjernes, hvis der klikkes på en anden knap
Henter alle rækker fra tabellen.
Her laver jeg en arrow function, fordi jeg laver en forEach iteration. 
Funktionen er simpel og har kun ét formål hvilket at tjekke og ændre knaptekst
*/
const allRows = document.querySelectorAll("#albumTable tbody tr");
  allRows.forEach(row => {
      const btn = row.querySelector('button'); 
      if (btn !== button) { 
          btn.textContent = "Vis Trackliste"; 
      }
});
/*
Opretter en if betingelse, for at teksten på knappen skifter, ved tryk
Og for at vise tracklisten for albummet.
*/
if(button.textContent === "Skjul Trackliste") {
  trackListContent.innerHTML = '';
  button.textContent = "Vis Trackliste";
  button.classList.remove('active'); // Fjerner klassen, når tracklisten skjules
  
} else {
  button.textContent = "Skjul Trackliste"; 
    displayTracklist(trackListContent, album);
    button.classList.add('active'); // Tilføjer klassen, når tracklisten vises
}
}

//opretter funktionen for at vise tracklisten for albummet.
function displayTracklist(trackListContent, album) {
  trackListContent.innerHTML = '';
  console.log("Viser trackliste for:", album.albumName);

/*
Opretter en overskrift til tracklisten
Lavet en overskrift til tracklist navnet.
*/
  const albumInfo = document.createElement('h3');
  albumInfo.textContent = `${album.artistName} - ${album.albumName}`; //overskriften kommer til at være artistnavn og albumnavn.
  trackListContent.appendChild(albumInfo);

// Tjekker om albumet har en tracklist, og at den ikke er tom. 
// Dette sikrer, at der kun oprettes en liste, hvis der rent faktisk er tracks at vise.
  if (album.tracklist && album.tracklist.length > 0) {
    const trackList = document.createElement('ul'); // Opretter et ul-element for at indeholde tracklisten

    // Itererer gennem hvert track i tracklisten. 
  // Loopet gør det muligt at oprette et listeelement for hvert track, så vi kan vise alle numre i albummet.
    for (let i = 0; i < album.tracklist.length; i++) {
      const track = album.tracklist[i];
      const trackItem = document.createElement('li'); // Opretter en li-element for hvert track (liste)
      trackItem.className = 'track-item';
      
// Track titel
const trackTitle = document.createElement('span'); // Opretter et span-element til track-titlen
trackTitle.className = 'track-title'; // Tildeler klassen 'track-title' til trackTitle for styling
trackTitle.textContent = `${track.trackNumber}. ${track.trackTitle}`; // Sætter tekstindholdet til tracknummer og titel

// Tid display
const timeDisplay = document.createElement('span'); // Opretter et span-element til at vise tracktiden
timeDisplay.className = 'time-display'; // Tildeler klassen 'time-display' til timeDisplay for styling
timeDisplay.textContent = `${track.trackTimeInSeconds} sek.`; // Tildeler sekunder til timeDisplay uden if-statement, da jeg ved, at alle tracks har en værdi for tid


if (track.trackTimeInSeconds === 300) {
  trackItem.addEventListener('mouseover', function() {
    console.log('Godt du er vågen. Hvis du fjerner musen rydder du konsollogen 😱'); // Viser beskeden, når musen hoverer over elementet med 300 sekunder
  });
  trackItem.addEventListener('mouseout', function() {
    console.clear(); // Rydder beskeden, når musen fjernes
    console.log('Bare rolig, du kan bare refreshe side')
  });
}
// Tilføj elementer til track item
trackItem.appendChild(trackTitle); // Tilføjer track-titlen til trackItem (listeelementet)
trackItem.appendChild(timeDisplay); // Tilføjer tiden til trackItem
trackList.appendChild(trackItem); // Tilføjer hele trackItem til trackListen
    }
    trackListContent.appendChild(trackList);
  }
}
//Magic-spell kopieret
async function fetchContent(url) {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

fetchContent("albums.json").then(function(albums) {
  for (let i = 0; i < albums.length; i++) {
    const album = new Album(
      albums[i].artistName,
      albums[i].albumName,
      albums[i].genre,
      albums[i].productionYear,
      albums[i].trackList
    );

    addAlbumToTable(album); // Tilføjer det oprettede album til tabellen
  }
});