const countrySearch = document.getElementById("countrySearch");
const searchBtn = document.getElementById("searchBtn")
let mainCard = document.querySelector("#card1");
let secCard = document.querySelector("#card2");
let thirdCard = document.querySelector("#card3");

let currentDate = new Date();
let day = currentDate.getDate();
let month = currentDate.getMonth();
let monthNames = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];
let monthName = monthNames[month]
let year = currentDate.getYear();
let dayOfWeek = currentDate.getDay();
let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let dayName = daysOfWeek[dayOfWeek];
let day2 = daysOfWeek[(dayOfWeek + 1) % 7];
let day3 = daysOfWeek[(dayOfWeek + 2) % 7];

countrySearch.addEventListener('focus', () => {
    countrySearch.style.backgroundColor = 'white';


});




async function displayCard1(res) {
    let blackBox = "";
    blackBox += `
        <div class="header-custom-light card-header d-flex justify-content-between text-dark ms-2 me-3">
            <div class="day">${dayName}</div>
            <div class="date">${day}${monthName}</div>
        </div>
        <div class="card-body body-custom-light ">
            <h5 class="card-title">${res.location.name}</h5>
            <div class="cardText">
                <div class="degree d-flex justify-content-between text-center">
                    <h1 class=" ms-5 m-4 fs-1 fw-bold  text-center">${res.current.temp_c}<sub class="sub-top">o</sub>C</h1>
                    <img src="${res.current.condition.icon}" alt="">
                </div>
                <p class="weatherCondition">${res.current.condition.text}</p>
                <span class="px-2 m-2"><img src="images/icon-umberella@2x.png" alt=""  style="width:20px"> ${res.forecast.forecastday[0].day.daily_chance_of_rain}%</span>
                <span class="px-2 m-2"><img src="images/icon-wind@2x.png" alt="" style="width:20px"> ${res.current.wind_kph} km/h</span>
                <span class="px-2 m-2"><img src="images/icon-compass@2x.png" alt="" style="width:20px"> ${res.current.wind_dir}</span>
            </div>
        </div>`;
    mainCard.innerHTML = blackBox;
}

async function displayCard2(res) {
    let SecondBox = "";
    SecondBox += `
        <div class="header-custom-light card-header   text-center text-dark ms-2 me-3">
            <div class="day">${day2}</div>
            
        </div>
        <div class="card-body body-custom-light">
                <div class="body-custom-dark  card-body text-center ">
             <div class="cardImg">
                    <img src="${res.forecast.forecastday[1].day.condition.icon}" alt="">
                    
                </div>
                 <div class="degreeAfter">
            <h4>${res.forecast.forecastday[1].day.maxtemp_c}<sub class="sub-top">o</sub>C</h4>
          </div>
                <small>${res.forecast.forecastday[1].day.mintemp_c}<sub class="sub-top">o</sub></small>
          <p class="weatherCondition">${res.forecast.forecastday[1].day.condition.text}</p>
          </div>`;

    secCard.innerHTML = SecondBox;
}

async function displayCard3(res) {
    let thirdBox = "";
    thirdBox += `
        <div class="header-custom-light card-header  text-center text-dark ms-2 me-3">
            <div class="day">${day3}</div>
            
        </div>
        <div class="card-body body-custom-light">
                <div class="body-custom-dark card-body text-center ">
             <div class="cardImg">
                    <img src="${res.forecast.forecastday[2].day.condition.icon}" alt="">
                    
                </div>
                 <div class="degreeAfter">
            <h4>${res.forecast.forecastday[2].day.maxtemp_c}<sub class="sub-top">o</sub>C</h4>
          </div>
                <small>${res.forecast.forecastday[2].day.mintemp_c}<sub class="sub-top">o</sub></small>
          <p class="weatherCondition">${res.forecast.forecastday[2].day.condition.text}</p>
          </div>`;

    thirdCard.innerHTML = thirdBox;
}




async function getWeather(x) {
    let data = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=40ace20a36fb4184a0a03955242212&q=${x ? x : "Egypt"}&days=3&aqi=no&alerts=no`
    )
    let res = await data.json();

    console.log(res)
    await displayCard1(res);
    await displayCard2(res);
    await displayCard3(res);

};
getWeather();

