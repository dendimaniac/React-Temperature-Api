import React, { Component } from 'react';
import './App.css';

class Temperature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      weathers: []
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

  createTable = () => {
    let table = []

    for (let i = 1; i < 6; i++) {
      table.push(
      <div className="column">
        <div className="row">
          {this.state.weathers[i].dateAndTime}
        </div>
        <div className="row">
          {this.state.weathers[i].description}
        </div>
        <div className="row">
          {Math.round(this.state.weathers[i].temperature)}
        </div>
      </div>)
    }
    return table;
  }

  render() {
    if (!this.state.weathers.length) {
      return null;
    }
    return (
      <div className="Temperature">
        <div className="Temperature-box">
          <p className="Temperature-temp">
            {Math.round(this.state.weathers[0].temperature)}
          </p>
          
          <p className="Temperature-city">
            {this.state.city}
          </p>

          <p className="Temperature-date">
            {this.state.weathers[0].dateAndTime}
          </p>

          <div className="Temperature-hours">
            {this.createTable()}
          </div>
        </div>
      </div>
    );
  }
}

export default Temperature;
