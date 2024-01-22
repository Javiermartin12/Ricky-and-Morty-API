import { InfoAPI, Character, Episode } from "./interfaces";

// API URL for fetching episodes
const urlEpisodes = 'https://rickandmortyapi.com/api/episode';

// HTML elements
const episodesList = document.getElementById('listEpisodes') as HTMLUListElement;
const nextBtn = document.getElementById('button--load') as HTMLButtonElement;

// Function to print titles of episodes and set up event listeners
async function printTitle(url: string) {
  // Fetch data from the API
  const data = await fetch(url);
  const JSONdata: InfoAPI = await data.json();
  const episodes: Episode[] = JSONdata.results;

  // Print titles of episodes
  episodes.forEach((episode) => {
    episodesList.insertAdjacentHTML('beforeend', `<li id='${episode.episode}' episodeUrl='${episode.url}'> ${episode.name}</li>`);
    const clickEpisode = document.getElementById(`${episode.episode}`) as HTMLLIElement;
    clickEpisode.addEventListener('click', printInfoEpi);
  });

  // Set up event listener for the "Load More" button
  if (JSONdata.info.next) {
    nextBtn.addEventListener(
      'click',
      () => {
        printTitle(JSONdata.info.next);
      },
      { once: true }
    );
  } else {
    // Remove the button if there are no more episodes
    nextBtn.remove();
  }
}

// Function to print detailed information about a selected episode
async function printInfoEpi(click: MouseEvent) {
  const target = click.target as HTMLLIElement;
  const urlEpisode = target.getAttribute('episodeUrl')!;

  // Fetch data for the selected episode
  const data = await fetch(urlEpisode);
  const episodeInfo: Episode = await data.json();

  // Display detailed information about the episode
  const displayEpisodeInfo =
    `<div class="title">
    <p>${episodeInfo.name}</p>
    <p>${episodeInfo.air_date}</p>
    <p>${episodeInfo.episode}</p>
    </div>`;

  const printEpisodeInfo = document.getElementById('content--area') as HTMLDivElement;
  printEpisodeInfo.innerHTML = displayEpisodeInfo;

  // Fetch and display information about characters in the episode
  const characters = episodeInfo.characters;
  characters.forEach(async urlCharacter => {
    const data = await fetch(urlCharacter);
    const characterinfo: Character = await data.json();
    const displayCharacterInfo =
      `<div class="card">
      <p>${characterinfo.name}</p>
      <p>${characterinfo.status}</p>
      <p>${characterinfo.species}</p>
      <p>${characterinfo.gender}</p>
      <img src='${characterinfo.image}'>
      </div>`;
    printEpisodeInfo.insertAdjacentHTML('beforeend', displayCharacterInfo);
  });
}

// Initial call to print titles of episodes
printTitle(urlEpisodes);
