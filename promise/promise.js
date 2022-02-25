var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var config = require('./config.js');

console.log("start");

/* Using Promise to implement async*/
function getApi(email, password) {
    return new Promise((resolve, reject) =>{
        setTimeout(()=> {
            if (email === "lli@lli.com" && password === "123") {
                console.log("got apikey!");
                resolve({key: config.apiKey});
            }else {
                reject(new Error("invalid email or password!"));
                return;
            }
        }, 3000);
    });
}

function getId(api) {
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            if(api === config.apiKey) {
                console.log("got movie id!");
                resolve({id: "tt0190332", apiKey: api});
            }else {
                reject(new Error("invalid email or password!"));
                return;
            }
        }, 3000);
    });
}

function getMovieDetails(id, apiKey) {
    return new Promise((resolve, reject) => {
        const xmlHttp = new XMLHttpRequest();
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

getApi("lli@lli.com", "123")
    .then(api => getId(api.key))
    .then(res => getMovieDetails(res.id, res.apiKey))
    .then(res => console.log(res.Title))
    .catch(err => console.error(err));

console.log("finish");
