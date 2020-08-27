/* Global Variables */
let baseUrl = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather";
let zip = "32304";
let apiKey = "64126defcfdcb6caa57facd988543301";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const getData = async (url = "") => {
    fetch(url, {
        method: 'GET',
        headers: {                
            'Content-Type': 'text/javascript',
            'Access-Control-Allow-Origin': '*'
        }
    }).then(response => {
        const json = response.json();
        console.log('newData json', json);
        return json;
    }).then(newData => {
        console.log('newData', newData);
    });
}

const postData = async (url = "", data = {}) => {    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/javascript'
        },
        body: data
    });

    try {
        const newData = await response.json();
        console.log('newData', newData);
    } catch (error) {
        console.log('Error', error);
    }
}

// Create an event listener for the element with the id: 
// generate, with a callback function to execute when it is clicked.
const doc = document;
doc.addEventListener('DOMContentLoaded', () => {    
    doc.getElementById('generate').addEventListener('click', () => {
        let zip = doc.getElementById('zip').value;
        getData(`${baseUrl}?zip=${zip}&appid=${apiKey}`);
    });
});