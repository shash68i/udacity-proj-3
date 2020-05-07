
const baseUrl = "https://api.openweathermap.org/data/2.5/weather"
apiKey = "0be04dfd378bf5719729707bd6e376c1"

// Getting elements
const zipElement = document.getElementById("zip");
const feelingsElem = document.getElementById("feelings");
const generateBtn = document.getElementById("generate");

// Getting Date
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

generateBtn.addEventListener("click", async () => {
    fetch(`${baseUrl}?zip=${zipElement.value},IN&appid=${apiKey}`,{
        method: "GET",
    })
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        const {main: { temp: temperature }} = response
        // console.log(temperature);
        return fetch("http://127.0.0.1:3000/api", {
            method: "POST",
            body: JSON.stringify({
                temperature: temperature,
                date: newDate,
                feelings:feelingsElem.value
            }),
            headers: { 
                "Content-type": "application/json"
            } 
        })
    })
    .then(function(response){
        return response.json();
    })
    .then(function({date,temperature,feelings}){
        document.getElementById('date').innerHTML = 'Date: ' + date;
        document.getElementById('temp').innerHTML = 'Temperature: ' + temperature;
        document.getElementById('content').innerHTML = 'Note: ' + feelings;
    })
    .catch(function(error) {
        console.log('Request failed', error)
      })
});

















// const getWeatherInfo = async zip =>
//     await fetch(`${baseUrl}?zip=${zip},IN&appid=${apiKey}`);


// const apiPostReq = async ({ temperature, date, feeling }) =>
//     await fetch("/api", {
//         method: "POST",
//         credentials: "same-origin",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ temperature, date, feeling })
// });

// const updateUI = async () => {
//     const request = await fetch("/apiGet");
//     try {
//       const {date, temperature, feeling} = await request.json();
//       document.getElementById('date').innerHTML = 'Date: ' + date;
//       document.getElementById('temp').innerHTML = 'Temperature: ' + temperature;
//       document.getElementById('content').innerHTML = 'Note: ' + feeling;
//     } catch (error) {
//       console.log("error", error);
//     }
//   };


// generateBtn.addEventListener("click", async () => {
//     zipValue = zipElement.value;
//     const feeling = feelingsElem.value;
//     const res = await getWeatherInfo(zipValue);
//     try {
//         const {
//             main: { temp: temperature }
//       } = await res.json();
//       await apiPostReq({ temperature, date, feeling });
//       await updateUI();
//     } catch (err) {
//       console.error(err);
//     }
//   });