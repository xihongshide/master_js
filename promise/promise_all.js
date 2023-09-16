import {XMLHttpRequest as XHR} from 'xmlhttprequest';
import config from "../config.js";

console.log("start");

/* Practice Promise.all()*/
function getApi(email, password) {
    return new Promise((resolve, reject) =>{
        setTimeout(()=> {
            if (email === "lli@lli.com" && password === "123") {
                console.log("got apikey!");
                resolve({key: config.OMDB_API_KEY});
            }else {
                reject(new Error("invalid email or password!"));
                return;
            }
        }, 1000);
    });
}

function getId(user) {
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            if(user === "lli") {
                console.log("got movie id!");
                resolve({id: "tt0190332"});
            }else {
                reject(new Error("user dose not exist!"));
                return;
            }
        }, 1000);
    });
}

function getMovieDetails(apiKey, id) {
    return new Promise((resolve, reject) => {
        const xmlHttp = new XHR();
        const url = "http://www.omdbapi.com/?i=" + id + "&apikey=" + apiKey;
        xmlHttp.open("GET", url, true); // true for asynchronous
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status >= 300) {
                    reject(new Error("Error, status code = " + xmlHttp.status));
                    return;
                }
                const resp = JSON.parse(xmlHttp.responseText);
                if (resp.Response === "False") {
                    reject(new Error(resp.Error));
                    return;
                }
                console.log("got movie details!");
                resolve(JSON.parse(xmlHttp.responseText));
            }
        };
        xmlHttp.send(null);
    });
}

// Promise.all() get all the promise at the same time, and will execute until all the promises return.
Promise.all([getApi("lli@lli.com", "123"), getId("lli")])
    .then(res => {
        return getMovieDetails(res[0].key, res[1].id);
    })
    .then(res => console.log(res.Title))
    .catch(err => console.error(err));

console.log("finish");
