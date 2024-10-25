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
toggleButton.textContent = 'Vis tracklist' //Tekst til knappen

//Opretter en klik begivenhed for at kunne vise trackList
toggleButton.onclick = function(){
  toggletrackList(toggleButton, album);
}

};
//
function toggletrackList(button, album){
  const trackListBox = document.getElementById('trackListBox');
  const trackListContent = trackListBox.querySelector('.tracklist-content');

}

// Funktion til at hente data fra en URL
async function fetchContent(url) {
  const response = await fetch(url); // Sender HTTP-anmodning for at hente data fra den angivne URL
  const json = await response.json(); // Konverterer svaret til JSON-format
  //console.log("Data hentet fra:", url); // Logger hentning af data
  return json; // Returnerer den hentede JSON-data
}

// Hovedfunktion til at indlæse og vise data fra albums.json
fetchContent("albums.json").then(function(albums) {
  //console.log("Original Data:", albums); // Logger de originale data til konsollen for debugging
  for (let i = 0; i < albums.length; i++) {
    // Opretter et nyt Album-objekt for hvert album i dataene
    const album = new Album(
      albums[i].artistName,
      albums[i].albumName,
      albums[i].genre,
      albums[i].productionYear,
      albums[i].trackList
    );
    
    //console.log("Album oprettet:", album); // Logger oprettelsen af hvert album
    addAlbumToTable(album); // Tilføjer det oprettede album til tabellen
  }
});