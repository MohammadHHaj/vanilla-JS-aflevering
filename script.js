//Lavet Album-objekt, samt strukturen for albummet.
function Album(artistName, albumName, genre, productionYear, tracklist){
    this.artistName = artistName; 
    this.albumName = albumName;
    this.genre = genre;
    this.productionYear = productionYear;
    this.tracklist = tracklist;
}

function addAlbumToTable(album){
  console.log('album oprettet', album)
};


// Funktion til at hente data fra en URL
async function fetchContent(url) {
  const response = await fetch(url); // Sender HTTP-anmodning for at hente data fra den angivne URL
  const json = await response.json(); // Konverterer svaret til JSON-format
  console.log("Data hentet fra:", url); // Logger hentning af data
  return json; // Returnerer den hentede JSON-data
}

// Hovedfunktion til at indlæse og vise data fra albums.json
fetchContent("albums.json").then(function(albums) {
  console.log("Original Data:", albums); // Logger de originale data til konsollen for debugging
  for (let i = 0; i < albums.length; i++) {
    // Opretter et nyt Album-objekt for hvert album i dataene
    const album = new Album(
      albums[i].artistName,
      albums[i].albumName,
      albums[i].genre,
      albums[i].productionYear,
      albums[i].trackList
    );
    console.log("Album oprettet:", album); // Logger oprettelsen af hvert album
    addAlbumToTable(album); // Tilføjer det oprettede album til tabellen
  }
});