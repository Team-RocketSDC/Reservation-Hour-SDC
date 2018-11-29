import React, { Component } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';
import ReservationForm from './components/Reservation-Form';
import Hour from './components/Hour';

const Sidebar = styled.div`
  width: 300px;
`;

const Wrapper = styled.div`
  background-color: white;
  box-sizing: border-box;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  width: 100%;
  padding: 14px;
`;

const Rail = styled.div`
  border-left: 1px solid #c1c1c1;
  width: 100%;
  box-sizing: border-box;
  padding-left: 30px;
`;

const Heading = styled.h4`
  margin: 0;
  margin-bottom: 11px;
  padding: 0 11px;
  span {
    margin-left: 10px;
  }
`;

const ReservationFormWrapper = styled.div`
  margin: 0;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      reservations: [],
      hours: [],
    };
  }

  componentDidMount() {
    const restaurantId = window.location.pathname.slice(1);
    axios
      .get(`http://localhost:5882/api/${restaurantId}/reservation`)
      .then((response) => {
        const reservations = response.data[0].reservations.map(reservation => Object.assign({}, reservation, {
            time: moment(reservation.time).format('kk:mm'),
            name: response.data[0].name,
            date: moment(reservation.time).format('MM YYYY'),
          }),);
        axios
          .get(`http://localhost:5882/api/${restaurantId}/hour`)
          .then((result) => {
            const data = [
              {
                weekday: 0,
                openingHour: result.data[0].monday.slice(0, 8),
                closingHour: result.data[0].monday.slice(11, 19),
                name: result.data[0].name,
              },
              {
                weekday: 1,
                openingHour: result.data[0].tuesday.slice(0, 8),
                closingHour: result.data[0].tuesday.slice(11, 19),
                name: result.data[0].name,
              },
              {
                weekday: 2,
                openingHour: result.data[0].wednesday.slice(0, 8),
                closingHour: result.data[0].wednesday.slice(11, 19),
                name: result.data[0].name,
              },
              {
                weekday: 3,
                openingHour: result.data[0].thursday.slice(0, 8),
                closingHour: result.data[0].thursday.slice(11, 19),
                name: result.data[0].name,
              },
              {
                weekday: 4,
                openingHour: result.data[0].friday.slice(0, 8),
                closingHour: result.data[0].friday.slice(11, 19),
                name: result.data[0].name,
              },
              {
                weekday: 5,
                openingHour: result.data[0].saturday.slice(0, 8),
                closingHour: result.data[0].saturday.slice(11, 19),
                name: result.data[0].name,
              },
              {
                weekday: 6,
                openingHour: result.data[0].sunday.slice(0, 8),
                closingHour: result.data[0].sunday.slice(11, 19),
                name: result.data[0].name,
              },
            ];
            const hours = data.map(weekday => Object.assign({}, weekday, {
                opening_hour: weekday.openingHour.slice(0, 5),
                closing_hour: weekday.closingHour.slice(0, 5),
              }),);
            this.setState({
              reservations,
              hours,
            });
          });
      });
  }

  render() {
    const { reservations, hours } = this.state;
    return (
      <Sidebar>
        <Wrapper>
          <Heading>
            <i className="far fa-calendar" />
            <span>Make a Reservation</span>
          </Heading>
          <ReservationFormWrapper>
            <ReservationForm reservations={reservations} hours={hours} />
          </ReservationFormWrapper>
        </Wrapper>
        <Rail>
          <Hour hours={hours} />
        </Rail>
      </Sidebar>
    );
  }
}

export default App;

render(<App />, document.querySelector('#yump-reservation-hours'));
