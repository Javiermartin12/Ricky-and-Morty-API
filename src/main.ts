import { InfoAPI,Info,Episode } from "./interfaces";
const urlEpisodes = 'https://rickandmortyapi.com/api/episode';
const urlCharacters = 'https://rickandmortyapi.com/api/character';
const urlLocations = 'https://rickandmortyapi.com/api/location';
 
async function getEpisodes():Promise<InfoAPI>{
    try{
        const apiEpisode = await fetch(urlEpisodes)
        const data: InfoAPI = await apiEpisode.json();
        const episodes: Episode[] = data.results;

        episodes.forEach(episode => {
            
            const container = document.getElementById('listEpisodes') as HTMLUListElement;
            const liEpisode = document.createElement('li');
            liEpisode.textContent = `Episode ${episode.id}`;
            container.appendChild(liEpisode);
        })
return data;

    }catch (error){
        throw new Error('Su puta madre')
    }
} 

getEpisodes()
.then((dataResult) =>{
    getMoreTittle(dataResult)
})


 function getMoreTittle(dataResult: InfoAPI): void{
const buttonLoadEpisodes = document.getElementById('button--load') as HTMLButtonElement;
let checkEvent: boolean = true;
buttonLoadEpisodes.addEventListener('click', ()=> {
    
    if(checkEvent){
        printMoreTitle(dataResult);
       checkEvent = false;
       
    }

})
}        


async function printMoreTitle(dataResult: InfoAPI){
    try {
        if(dataResult.info.next){
        const responseNextEpi = await fetch(dataResult.info.next);
        const data:InfoAPI = await responseNextEpi.json();
        const episode: Episode[] = data.results;

    episode.forEach(episode =>{
        const container = document.getElementById('listEpisodes') as HTMLUListElement;
        const liEpisode = document.createElement('li');
        liEpisode.textContent = episode.name
        container.appendChild(liEpisode);
  })
}
    } catch (error) {
        throw new Error("eeeeeeeee");
        
    }

}