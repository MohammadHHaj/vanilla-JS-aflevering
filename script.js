function Albums(artistName, albumName, genre, productionYear, tracklist){
    this.artistName = artistName;
    this.albumName = albumName;
    this.genre = genre;
    this.productionYear = productionYear;
    this.tracklist = tracklist;
}

async function fetchContent(url) {
    const response = await fetch(url); // Sender HTTP-anmodning for at hente data fra den angivne URL
    const json = await response.json(); // Konverterer svaret til JSON-format
    return json; // Returnerer den hentede JSON-data
  }