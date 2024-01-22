var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const urlEpisodes = 'https://rickandmortyapi.com/api/episode';
const episodesList = document.getElementById('listEpisodes');
const nextBtn = document.getElementById('button--load');
printTitle(urlEpisodes);
function printTitle(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetch(url);
        const JSONdata = yield data.json();
        const episodes = JSONdata.results;
        episodes.forEach((episode) => {
            episodesList.insertAdjacentHTML('beforeend', `<li id='${episode.episode}' episodeUrl='${episode.url}'> ${episode.name}</li>`);
            const clickEpisode = document.getElementById(`${episode.episode}`);
            clickEpisode.addEventListener('click', printInfoEpi);
        });
        if (JSONdata.info.next) {
            nextBtn.addEventListener('click', () => {
                printTitle(JSONdata.info.next);
            }, { once: true });
        }
        else {
            nextBtn.remove();
        }
    });
}
function printInfoEpi(click) {
    return __awaiter(this, void 0, void 0, function* () {
        const target = click.target;
        const urlEpisode = target.getAttribute('episodeUrl');
        console.log(urlEpisode);
        const data = yield fetch(urlEpisode);
        const episodeInfo = yield data.json();
        const displayEpisodeInfo = `<div class="title">
    <p>${episodeInfo.name}</p>
    <p>${episodeInfo.air_date}</p>
    <p>${episodeInfo.episode}</p>
    </div>`;
        const printEpisodeInfo = document.getElementById('content--area');
        printEpisodeInfo.innerHTML = displayEpisodeInfo;
        const characters = episodeInfo.characters;
        characters.forEach((urlCharacter) => __awaiter(this, void 0, void 0, function* () {
            const data = yield fetch(urlCharacter);
            const characterinfo = yield data.json();
            const displayCharacterInfo = `<div class="card">
    <p>${characterinfo.name}</p>
    <p>${characterinfo.status}</p>
    <p>${characterinfo.species}</p>
    <p>${characterinfo.gender}</p>
    <img src='${characterinfo.image}'>
    </div>`;
            printEpisodeInfo.insertAdjacentHTML('beforeend', displayCharacterInfo);
        }));
    });
}
export {};
