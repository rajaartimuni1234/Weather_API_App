const grantLocationAccess=document.querySelector("#grantLocationAccess");
const get =(param)=>document.getElementById(`${param}`);
const grantAcessbutton=get('grantAcessbutton');
const currentWeatherDetail=get('currentWeatherDetail');


const leftButton=get('leftButton');
const rightButton=get('rightButton');
const cardSlider=document.querySelectorAll(' #singleCard')

const datasearchFrom=get("data-searchFrom")
const datasearchinput=get("data-searchinput");
const datasearchButton=get("data-searchButton");
const  dayNum=new Date();
//let isDay=dayNum.getDay();
//console.log(isDay)

console.log(cardSlider.length);
//create Array of day
let dayName=[ 'Sun','Mon','Tues', 'Wed', 'Thur', 'Fri', 'Sat',]
const tenDayWeather=get('tenDayWeather');
const loading=get('loading');

//Api key
const ApiKey='822343f78e5c49819bd135557230410'


//grant Access startring alway active
grantLocationAccess.classList.remove('hidden')
//set am and pm
leftButton.classList.remove('hidden');
rightButton.classList.remove('hidden');

function getformSessionStroage(){
    const localCoordintes=sessionStorage.getItem('user_coordinates');
    if (!localCoordintes){
        grantLocationAccess.classList.remove("hidden");
    }
    else {
        const coordinates=JSON.parse(localCoordintes);
        fetchUserWeatherInfo(coordinates)

    }
}

//show to  current weather information
 function renderWeatheriInfo(weatherinfo){
    //current weather info
    console.log("show weather info");
    const cityName=get('cityName');
    const regionName=get('regionName');
    const countryName=get('countryName');
    const Date=get('Date');
    const currentTime=get('currentTime');
   const weatherIcon=get("weatherIcon");
   const tempdegree=get("tempdegree");
   const weatherfeel=get('weatherText');
   const  feelslike=get("feelslike");
   const SunRiseTime=get("SunRiseTime");
   const sunSettime=get("sunSettime");
   const airquality=get("airquality");
   const wind=get('wind');
   const Humidity=get('Humidity');
   const visibility=get('visibility');
   const pressure=get('pressure');
   const dewPoint=get('dewPoint');
   let setAMPM
   //10day weather info
   
   //=get('setAmPm');
   //current weather intizlies
   cityName.innerText=weatherinfo?.location?.name;
   regionName.innerText=weatherinfo?.location?.region;
   countryName.innerText=weatherinfo?.location?.country;
   Date.innerText=weatherinfo?.location?.localtime.slice(0,10);
   setAMPM= weatherinfo?.location?.localtime.slice(10,-1)>=12?"AM":"PM";
   console.log(setAMPM);
  currentTime.innerText=`${weatherinfo?.location?.localtime.slice(10,16)} ${setAMPM} `;
   weatherIcon.src=weatherinfo?.current?.condition?.icon;
   tempdegree.innerHTML=`${weatherinfo?.current?.temp_c} <sup>°c</sup>`;
   weatherfeel.innerText=`${weatherinfo?.current?.condition?.text}`;
   feelslike.innerHTML=`${weatherinfo?.current?.feelslike_c} <sup>°</sup>`;
  SunRiseTime.innerText=weatherinfo?.forecast?.forecastday[0]?.astro.sunrise;
  sunSettime.innerText=weatherinfo?.forecast?.forecastday[0]?.astro.sunset;
  airquality.innerText=weatherinfo?.current?.wind_degree;

wind.innerText=`${weatherinfo?.current?.wind_mph} mph`;
Humidity.innerText=`${weatherinfo?.current?.humidity} %`;
visibility.innerText=`${weatherinfo?.current?.vis_miles} mi`;
pressure.innerText=`${weatherinfo?.current?.pressure_in} in`;
dewPoint.innerHTML=`${weatherinfo?.forecast?.forecastday[0]?.hour[0]?.dewpoint_c} <sup>°</sup>`;
   console.log(currentTime)
 }

 //tempShow function
 function tempShow( weatherInfo){
    const tentemp=document.querySelectorAll("#degree")

    tentemp.forEach((temp,index)=>{
        temp.innerHTML=`${weatherInfo?.forecast?.forecastday[index]?.day?.avgtemp_c}°`
        console.log(index);
        
    })
 }

 //weater icon show
 function weatherIconShow(weatherInfo){
    const tenweatherIcon=document.querySelectorAll("#tenweatherIcon");
  
    console.log(tenweatherIcon)
      tenweatherIcon.forEach((key,index)=>{
        key.src=weatherInfo?.forecast?.forecastday[index]?.day?.condition?.icon;
        
      }) 
 }
 //weather text show
 function weatherTextShow(weatherInfo){
    const weathertext=document.querySelectorAll('#weatherfeel');
    weathertext.forEach((text, index)=>{
        text.innerText=weatherInfo?.forecast?.forecastday[index]?.day?.condition?.text;
    })
 }
 //weather day show
 function weatherDayShow(weatherInfo){
    let dayChange=document.querySelectorAll("#dayChange")
    let isday=dayNum.getDay() ;
    console.log(isday)
    
     dayChange.forEach((today) => {
                 
                 if (isday<7){
                    
                today.innerText=dayName[isday++]
               console.log(isday)
                 }
                 else {
                    isday=0;
                    today.innerText=dayName[isday++]
                    console.log(isday)
                 }
    });  

 }
function renderTenDayWeatherInfo (weatherInfo){
    console.log("ten day weather info")
   weatherDayShow(weatherInfo)
   weatherIconShow(weatherInfo)
   tempShow(weatherInfo)
   weatherTextShow(weatherInfo)
 }


 
//fetch weather through the location
 async function  fetchUserWeatherInfo(coordinates){
    console.log("location step 4");

const {lat, lon}=coordinates;
  //call api
   try{
    console.log("location step-5");
    const response =await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${ApiKey}&q=${lat},${lon}&days=12&units=metric`)
    const data=await response.json();
    console.log(data);
   loading.classList.add('hidden')
   currentWeatherDetail.classList.remove('hidden');
   tenDayWeather.classList.remove('hidden')

   renderWeatheriInfo(data);
   renderTenDayWeatherInfo(data);
   }catch(err){
    console.log(err);
    loading.classList.add("hidden")
   }

}
//get location function
function getLocation(){
    console.log("locatin  step-2")
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        console.log("you do not allow your geolcation");
    }
}
//show location
 const showPosition =(Position)=>{
    console.log("location step-3")
    const coordinates={
        lat :Position.coords.latitude,
        lon :Position.coords.longitude,

    }
    sessionStorage.setItem("user_coordinates",JSON.stringify(coordinates));
    fetchUserWeatherInfo(coordinates)
 }

grantAcessbutton.addEventListener('click', ()=>{
   console.log("location access step-1")
    grantLocationAccess.classList.add("hidden")
    loading.classList.remove('hidden');
    getLocation()
})



 let count=0;
 //left slider button
function leftSideShow() {
   if(count<cardSlider.length/7){
count++
console.log("left slider");
slideImage()
}

}
//right slider button
function righsliderShow(){

    count--
    console.log("rightSlider");
    slideImage()
   
}

//slider Image show 
function slideImage(){
   
    cardSlider.forEach(
        (slide)=>{
            slide.style.transform=`translateX(-${count*100}%)`
        }
    )
    console.log("slide image");
}
//call left and right slider button
rightButton.addEventListener('click', (e)=>{
    e.preventDefault();
    leftSideShow()
}
)
leftButton.addEventListener('click', (e)=>{
    righsliderShow()
}
 )

//search weather through input 
datasearchFrom.addEventListener('submit', (e)=>{
    e.preventDefault();
    let inputValue=datasearchinput.value;
    if (inputValue==="")
    return ;

    else {
        fetchSearchWeather(inputValue);
    }


})

async function fetchSearchWeather( cityname){
    loading.classList.remove('hidden');
    currentWeatherDetail.classList.add('hidden')
    tenDayWeather.classList.add('hidden');
    grantLocationAccess.classList.add('hidden');

    try {
        const response=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${ApiKey}&q=${cityname}&days=12&units=metric`)
        const data=await response.json();
        
        console.log(data);
        loading.classList.add('hidden');
        currentWeatherDetail.classList.remove('hidden');
        tenDayWeather.classList.remove('hidden')
     
        renderWeatheriInfo(data);
        renderTenDayWeatherInfo(data);
    } catch(err){
        console.log(err);
    }
}


//weather search from your weather button
const locationSearch=get('locationSearch');
locationSearch.addEventListener('click',yourWeather);

function yourWeather(){
    locationSearch.style.font="bold"
    datasearchinput.value=" "
    grantLocationAccess.classList.add('hidden');
    currentWeatherDetail.classList.add('hidden');
    tenDayWeather.classList.add('hidden');
    getformSessionStroage()
 }