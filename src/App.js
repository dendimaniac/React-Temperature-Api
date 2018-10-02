import React, { Component } from 'react';
import './App.css';

class Temperature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      weathers: [{ }]
      /* dateAndTime: [],
      description: [],
      temperatureSet: [] */
    };
  }

  componentDidMount() {
    fetch('http://api.openweathermap.org/data/2.5/forecast?id=5368361&APPID=c5769021d086e184c505d924119a6dc6')
    .then(list => {
      return list.json();
    }).then(data =>
      {
        /* let city = data.city.name;

        let dateAndTime = data.list.map((dateTime) =>
        {
          return (
            <div key = {dateTime.dt}>
              {dateTime.dt_txt}
            </div>
          )
        })

        let description = data.list.map((des) => 
        {
          return (
            <div key = {des.weather.id}>
              {des.weather[0].main}
            </div>
          )
        })

        let temperatureSet = data.list.map((temp) =>
        {
          return (
            <div key={temp.main.temp}>
              {Math.round(temp.main.temp - 273.15)}
            </div>
          )
        }) */

        const city = data.city.name;

        const weathers = data.list.map((item) => {
          return ({
            dateAndTime: item.dt_txt,
            description: item.weather[0].main,
            temperature: item.main.temp - 273.15
          })
        })
        this.setState({
          city: city,
          /* dateAndTime: dateAndTime,
          description: description,
          temperatureSet: temperatureSet */
          weathers: weathers
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }


  render() {
    return (
      <div className="Temperature">
        <div>
          {this.state.city}
        </div>

        <div>
          {/* {this.state.dateAndTime[0]} */}
          {/* {this.state.weathers.map(weather => {
            return (
              <div>
                {weather.dateAndTime}
              </div>
            )
          })} */}
          {this.state.weathers[0].dateAndTime}
        </div>

        <div>
          {/* {this.state.description[0]} */}
          {this.state.weathers[0].description}
        </div>

        <div>
          {/* {this.state.temperatureSet[0]} */}
          {Math.round(this.state.weathers[0].temperature)}
        </div>
      </div>
    );
  }
}

export default Temperature;
