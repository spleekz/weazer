import axios from "axios"
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
export const weatherApi = {
  getWeather: (city) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=a461b63985a47ae55a5fbbcd791cb8b8`)
      .then(response => {
        return response.data
      })
  }
}
export const imageApi = {
  getImage: (season) => {
    let pageIndex = random(1, 1000)
    return axios.get("https://api.unsplash.com/search/photos?query=" + season + "&page=" + pageIndex + "&client_id=Yn6kPeTPPlgziJSqHv-8XhjCwsRvROmvpQby4cEdhkk")
      .then(response => {
        let imageIndex = random(0, response.data.results.length - 1)
        return response.data.results[imageIndex].urls.regular
      })
  }
}
export const locationApi = {
  getUserLocation: () => {
    return axios.get(`https://ipapi.co/json/`)
      .then(response => {
        return response.data
      })
  },
  getCountry: (lat, lon) => {
    return axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat},${lon}&key=fb307d8b91b245a29a924d775d9977ad`)
      .then(response => {
        return (response.data.results[0].components.country)
      })
  }
}