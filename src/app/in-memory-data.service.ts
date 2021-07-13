import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const months = [
      { id: 1, name: "January" },
      { id: 2, name: "February" },
      { id: 3, name: "March" },
      { id: 4, name: "April" },
      { id: 5, name: "May" },
      { id: 6, name: "June" },
      { id: 7, name: "July" },
      { id: 8, name: "August" },
      { id: 9, name: "September" },
      { id: 10, name: "October" },
      { id: 11, name: "November" },
      { id: 11, name: "December" }
    ];
    const temps = [
      {
        id: 1,
        range: {
          low: -50,
          high: 50
        }
      }
    ];

    const humidity = [
      {
        id: 1,
        range: {
          low: 0,
          high: 100
        }
      }
    ];

    const cities = [
      {
        id: 1,
        name: "Toronto",
        city_temp: "",
        city_coords: ""
      },
      {
        id: 2,
        name: "Tokyo",
        city_temp: "",
        city_coords: ""
      },
      {
        id: 3,
        name: "Los Angeles",
        city_temp: "",
        city_coords: ""
      },
      {
        id: 4,
        name: "Alyeska",
        city_temp: "",
        city_coords: ""
      }
    ];

    const cityTemps = [
      {
        cityId: 1,
        monthId: 1,
        avgCelcius: -10,
        avgHumidity: 80
      },
      {
        cityId: 1,
        monthId: 2,
        avgCelcius: -18,
        avgHumidity: 80
      },
      {
        cityId: 1,
        monthId: 3,
        avgCelcius: -8,
        avgHumidity: 81
      },
      {
        cityId: 1,
        monthId: 4,
        avgCelcius: -3,
        avgHumidity: 79
      },
      {
        cityId: 1,
        monthId: 5,
        avgCelcius: 5,
        avgHumidity: 80
      },
      {
        cityId: 1,
        monthId: 6,
        avgCelcius: 10,
        avgHumidity: 85
      },
      {
        cityId: 1,
        monthId: 7,
        avgCelcius: 20,
        avgHumidity: 90
      },
      {
        cityId: 1,
        monthId: 8,
        avgCelcius: 25,
        avgHumidity: 95
      },
      {
        cityId: 1,
        monthId: 9,
        avgCelcius: 7,
        avgHumidity: 83
      },
      {
        cityId: 1,
        monthId: 10,
        avgCelcius: 4,
        avgHumidity: 80
      },
      {
        cityId: 1,
        monthId: 11,
        avgCelcius: -3,
        avgHumidity: 79
      },
      {
        cityId: 1,
        monthId: 12,
        avgCelcius: -12,
        avgHumidity: 82
      },
      {
        cityId: 2,
        monthId: 1,
        avgCelcius: -10,
        avgHumidity: 80
      },
      {
        cityId: 2,
        monthId: 2,
        avgCelcius: 5,
        avgHumidity: 47
      },
      {
        cityId: 2,
        monthId: 3,
        avgCelcius: 10,
        avgHumidity: 50
      },
      {
        cityId: 2,
        monthId: 4,
        avgCelcius: 12,
        avgHumidity: 52
      },
      {
        cityId: 2,
        monthId: 5,
        avgCelcius: 15,
        avgHumidity: 60
      },
      {
        cityId: 2,
        monthId: 6,
        avgCelcius: 20,
        avgHumidity: 76
      },
      {
        cityId: 2,
        monthId: 7,
        avgCelcius: 26,
        avgHumidity: 79
      },
      {
        cityId: 2,
        monthId: 8,
        avgCelcius: 28,
        avgHumidity: 65
      },
      {
        cityId: 2,
        monthId: 9,
        avgCelcius: 10,
        avgHumidity: 61
      },
      {
        cityId: 2,
        monthId: 10,
        avgCelcius: 7,
avgHumidity: 55       },
      {
        cityId: 2,
        monthId: 11,
        avgCelcius: -2,
        avgHumidity: 52
      },
      {
        cityId: 2,
        monthId: 12,
        avgCelcius: -5,
        avgHumidity: 50
      },
      {
        cityId: 3,
        monthId: 1,
        avgCelcius: 15,
        avgHumidity:  5     
      },
      {
        cityId: 3,
        monthId: 2,
        avgCelcius: 18,
        avgHumidity:  6     
      },
      {
        cityId: 3,
        monthId: 3,
        avgCelcius: 19,
        avgHumidity:  6     
      },
      {
        cityId: 3,
        monthId: 4,
        avgCelcius: 20,
        avgHumidity:  10     
      },
      {
        cityId: 3,
        monthId: 5,
        avgCelcius: 25,
        avgHumidity: 25      
      },
      {
        cityId: 3,
        monthId: 6,
        avgCelcius: 25,
        avgHumidity:  70     
      },
      {
        cityId: 3,
        monthId: 7,
        avgCelcius: 30,
        avgHumidity:   75    
      },
      {
        cityId: 3,
        monthId: 8,
        avgCelcius: 34,
        avgHumidity:   90    
      },
      {
        cityId: 3,
        monthId: 9,
        avgCelcius: 25,
        avgHumidity:  90     
      },
      {
        cityId: 3,
        monthId: 10,
        avgCelcius: 19,
        avgHumidity:   70    
      },
      {
        cityId: 3,
        monthId: 11,
        avgCelcius: 17,
        avgHumidity: 72      },
      {
        cityId: 3,
        monthId: 12,
        avgCelcius: 17,
        avgHumidity:  10     },
      {
        cityId: 4,
        monthId: 1,
        avgCelcius: -30,
        avgHumidity: 70
   
   },
      {
        cityId: 4,
        monthId: 2,
        avgCelcius: -32,
        avgHumidity: 65
      },
      {
        cityId: 4,
        monthId: 3,
        avgCelcius: -20,
        avgHumidity: 50
      },
      {
        cityId: 4,
        monthId: 4,
        avgCelcius: -18,
        avgHumidity: 53
      },
      {
        cityId: 4,
        monthId: 5,
        avgCelcius: -10,
        avgHumidity: 50
      },
      {
        cityId: 4,
        monthId: 6,
        avgCelcius: -10,
        avgHumidity: 54
      },
      {
        cityId: 4,
        monthId: 7,
        avgCelcius: -5,
        avgHumidity: 50      
      },
      {
        cityId: 4,
        monthId: 8,
        avgCelcius: -4,
        avgHumidity: 60      
      },
      {
        cityId: 4,
        monthId: 9,
        avgCelcius: -8,
        avgHumidity: 68      
      },
      {
        cityId: 4,
        monthId: 10,
        avgCelcius: -15,
        avgHumidity: 72
      },
      {
        cityId: 4,
        monthId: 11,
        avgCelcius: -23,
        avgHumidity: 75
      },
      {
        cityId: 4,
        monthId: 12,
        avgCelcius: -28,
        avgHumidity: 79
      }
    ];

    const cityCoords = [
      {
        cityId: 1,
        latitude: 43.6532,
        longitude: -79.3832
      },
       {
        cityId: 2,
        latitude: 35.6895,
        longitude: 139.6917
      },
       {
        cityId: 3,
        latitude: 34.0522,
        longitude: 118.2437
      },
       {
        cityId: 4,
        latitude: 60.9608,
        longitude: -149.1108
      }
    ];


    return { months, temps, humidity, cities, cityTemps, cityCoords };
  }
}