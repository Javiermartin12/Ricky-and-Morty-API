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
const urlCharacters = 'https://rickandmortyapi.com/api/character';
const urlLocations = 'https://rickandmortyapi.com/api/location';
function getEpisodes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const apiEpisode = yield fetch(urlEpisodes);
            const data = yield apiEpisode.json();
            const episodes = data.results;
            episodes.forEach(episode => {
                const container = document.getElementById('listEpisodes');
                const liEpisode = document.createElement('li');
                liEpisode.textContent = `Episode ${episode.id}`;
                container.appendChild(liEpisode);
            });
            return data;
        }
        catch (error) {
            throw new Error('Su puta madre');
        }
    });
}
getEpisodes()
    .then((dataResult) => {
    getMoreTittle(dataResult);
});
function getMoreTittle(dataResult) {
    const buttonLoadEpisodes = document.getElementById('button--load');
    let checkEvent = true;
    buttonLoadEpisodes.addEventListener('click', () => {
        if (checkEvent) {
            printMoreTitle(dataResult);
            checkEvent = false;
        }
    });
}
function printMoreTitle(dataResult) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (dataResult.info.next) {
                const responseNextEpi = yield fetch(dataResult.info.next);
                const data = yield responseNextEpi.json();
                const episode = data.results;
                episode.forEach(episode => {
                    const container = document.getElementById('listEpisodes');
                    const liEpisode = document.createElement('li');
                    liEpisode.textContent = episode.name;
                    container.appendChild(liEpisode);
                });
            }
        }
        catch (error) {
            throw new Error("eeeeeeeee");
        }
    });
}
export {};
