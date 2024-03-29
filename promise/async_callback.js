import {XMLHttpRequest as XHR} from 'xmlhttprequest';
import config from "../config.js";

console.log("start");

/* Using Callbacks to implement async*/
function getApi(email, password, callback) {

    setTimeout(()=> {
        if (email === "lli" && password === "123") {
            callback({key: config.OMDB_API_KEY});
            console.log("got apikey!");
        }else {
            throw new Error("invalid email or password!");
        }
    }, 3000);
}

function getId(api, callback) {
    setTimeout(()=> {
        if(api === config.OMDB_API_KEY) {
            console.log("got id!");
            callback({id: "tt0190332",});
        }else {
            throw new Error("invalid email or password!");
        }
    }, 3000);
}

function getMovieDetails(id, apiKey) {
    const xmlHttp = new XHR();
    xmlHttp.open("GET", "http://www.omdbapi.com/?i=" + id + "&apikey=" + apiKey, false); // true for asynchronous
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText);
}

const movie = getApi("lli", "123", (api) =>{
    getId(api.key, (movie) => {
        console.log("got movie title!");
        console.log(getMovieDetails(movie.id, api.key).Title);
    });
});

console.log("finish");
