const cityInput = document.querySelector(".city-name")
const button = document.querySelector(".button")
const citiesList = document.querySelector(".cities-list")
const container = document.querySelector(".container-fluid")
let message = document.querySelector(".message")
let newArr = []
https://api.openweathermap.org/data/2.5/weather?q=Ankara&&appid=6d0fbf84b0651aad8930d8f214a017a6

container.addEventListener("click", (e)=>{
    if(e.target.className == "pls"){
        cityInput.focus()
    }
})

button.addEventListener("click", (e) => {
    e.preventDefault()
    getWeather();
    cityInput.value = ""
})

const getWeather = async () => {
    let location = cityInput.value.trim()
    const API_KEY = "6d0fbf84b0651aad8930d8f214a017a6"
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&&appid=${API_KEY}&units=metric`

    if (!location == "" && isNaN(location)){
        try{
            const res = await fetch(URL);
            if(res.status == 404){
                return (message.innerText = "Entered wrong city name",
                    setTimeout(() => {
                        message.innerText ="";
                    },2000))
            }else if(!res.ok){
                throw new Error("Something went wrong!")

            }else{

                const data = await res.json();
                getValues(data)
                console.log(data)
            }
            
        }catch (error){
            alert(error);
        }
    }else{
        message.innerText = "Please enter a city name"
            setTimeout(() => {
                message.innerText ="";
            },2000)
    }

}

const getValues = (value) => {
    
    const Country = value.sys.country
    const mainTemp = Math.floor(value.main.temp)
    const city = value.name;
    const WeatherDesc = value.weather[0].description
    const Image = value.weather[0].icon
    const cityId = value.id;
    const cityName = document.querySelector(".city")

    if(newArr.includes(cityId)){
        message.innerText = "city has been existed"
            setTimeout(() => {
                message.innerText ="";
            },3000)
        // return alert("city has been existed")
    }else{
        newArr =[cityId, ...newArr]
        cityName.innerHTML += `
            <h2 class="city-name">${city} <sup class="country">${Country}</sup> </h2>
            <h1>${mainTemp} <sup>°C</sup></h1>
            <img src="./icons/${Image}.png" alt="">
            <h4>${WeatherDesc}</h4>  
        ` 
    }
}
    

// const catchError = (err) => {
//     alert(err)
// }