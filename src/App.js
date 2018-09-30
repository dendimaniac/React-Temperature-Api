import React, { Component } from 'react';
import './App.css';

class Temperature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      dateAndTime: [],
      description: [],
      temperatureSet: []
    };
  }

  componentDidMount() {
    fetch('http://api.openweathermap.org/data/2.5/forecast?id=5368361&APPID=c5769021d086e184c505d924119a6dc6')
    .then(list => {
      return list.json();
    }).then(data =>
      {
        let city = data.city.name;

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
        })
        this.setState({
          city: city,
          dateAndTime: dateAndTime,
          description: description,
          temperatureSet: temperatureSet
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
          {this.state.dateAndTime[0]}
        <div>
          {this.state.description[0]}
        </div>
        <div>
          {this.state.temperatureSet[0]}
        </div>
      </div>
    );
  }
}

export default Temperature;
