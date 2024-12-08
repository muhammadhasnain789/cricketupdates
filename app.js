let apiKey = '44592efc-6cac-4488-8aa7-e32d0799f096';

let currentMatchesApi = `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`;
let matchesApi = `https://api.cricapi.com/v1/matches?apikey=${apiKey}&offset=0`;
let seriesApi = `https://api.cricapi.com/v1/series?apikey=${apiKey}&offset=0`;

async function fetchData(apiUrl) {
    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function renderCurrentMatches() {
    let currentMatchesContainer = document.getElementById('current-matches-list');
    currentMatchesContainer.innerHTML = '<p>Loading current matches...</p>';
    
    let data = await fetchData(currentMatchesApi);
    if (data && data.data) {
        currentMatchesContainer.innerHTML = data.data
            .map(match => `
                <div class="match-card">
                    <b>${match.name}</b> - 
                    <span class="match-status">${match.status}</span>
                </div>
            `)
            .join('');
    } else {
        currentMatchesContainer.innerHTML = '<p>No current matches data available.</p>';
    }
}

async function renderMatches() {
    let matchesContainer = document.getElementById('matches-list');
    matchesContainer.innerHTML = '<p>Loading upcoming matches...</p>';
    
    let data = await fetchData(matchesApi);
    if (data && data.data) {
        matchesContainer.innerHTML = data.data
            .map(match => `
                <div class="match-card">
                    <b>${match.name}</b> on 
                    <span class="match-date">${match.date}</span>
                </div>
            `)
            .join('');
    } else {
        matchesContainer.innerHTML = '<p>No matches data available.</p>';
    }
}

async function renderSeries() {
    let seriesContainer = document.getElementById('series-list');
    seriesContainer.innerHTML = '<p>Loading series data...</p>';
    
    let data = await fetchData(seriesApi);
    if (data && data.data) {
        seriesContainer.innerHTML = data.data
            .map(series => `
                <div class="series-card">
                    <b>${series.name}</b> 
                    <span class="series-dates">(${series.startDate} - ${series.endDate})</span>
                </div>
            `)
            .join('');
    } else {
        seriesContainer.innerHTML = '<p>No series data available.</p>';
    }
}
function initialize() {
    renderCurrentMatches(); 
    renderMatches();
    renderSeries();

  
    setTimeout(() => {
        location.reload();
    }, 5000);
}

initialize();

