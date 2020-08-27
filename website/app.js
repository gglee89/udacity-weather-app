/* Global Variables */
let openWeatherApiBaseURL = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather";
let serverBaseURL = "http://localhost:8000";
let openWeatherApiKey = "64126defcfdcb6caa57facd988543301";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

const getData = async (url = "") => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'text/javascript'
        }
    });

    try {
        return await response.json();
    } catch (error) {
        console.log("Error", error);
    }
}

const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try {
        return await response.json();
    } catch (error) {
        console.log('Error', error);
    }
}

// Create an event listener for the element with the id: 
// generate, with a callback function to execute when it is clicked.
const doc = document;
doc.addEventListener('DOMContentLoaded', () => {
    doc.getElementById('generate').addEventListener('click', async () => {
        let zip = doc.getElementById('zip').value;
        let feelings = doc.getElementById('feelings').value;

        // Fetch DATA from the OpenWeather API.
        let data = await getData(`${openWeatherApiBaseURL}?zip=${zip}&appid=${openWeatherApiKey}`);

        // Update fetched data to server.
        let response = await postData(`${serverBaseURL}/data`, { data: data, date: newDate, userInput: feelings });

        // Update UI elements.
        const date = doc.getElementById('date');
        const temp = doc.getElementById('temp');
        const content = doc.getElementById('content');

        if (response.success) {
            date.innerHTML = newDate;
            temp.innerHTML = `${data.main.temp} F`;
            content.innerHTML = feelings;
        } else {
            date.innerHTML = response.message;
            temp.innerHTML = "Error";
            content.innerHTML = response.error;
        }
    });
});