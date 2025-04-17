const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const resultsDiv = document.getElementById('results');

async function fetchMusic(query) {
  const API_URL = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=20`;
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    displayResults(data.results);
  } catch (error) {
    console.error('Error fetching music:', error);
    resultsDiv.innerHTML = `<p>Error fetching results. Please try again later.</p>`;
  }
}

function displayResults(songs) {
  resultsDiv.innerHTML = '';
  if (songs.length === 0) {
    resultsDiv.innerHTML = '<p>No results found.</p>';
    return;
  }

  songs.forEach(song => {
    const songDiv = document.createElement('div');
    songDiv.classList.add('song');

    const price = song.trackPrice
      ? `$${song.trackPrice.toFixed(2)}`
      : "Price not available";

    songDiv.innerHTML = `
      <img src="${song.artworkUrl100}" alt="${song.trackName}">
      <h3>${song.trackName}</h3>
      <p>${song.artistName}</p>
      <p><strong>Price:</strong> ${price}</p>
      <audio class="audio-preview" controls>
        <source src="${song.previewUrl}" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
    `;

    resultsDiv.appendChild(songDiv);
  });
}

searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchMusic(query);
  } else {
    resultsDiv.innerHTML = '<p>Please enter a search term.</p>';
  }
});

searchInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    searchButton.click();
  }
});