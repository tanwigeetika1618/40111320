import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

function TrainsPage() {
  const [trains, setTrains] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://104.211.219.98:80/train/trains') 
      .then(response => {
        setTrains(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>All Trains</h2>
      <ul>
        {trains.map(train => (
          <li key={train.id}>
            <Link to={`/trains/${train.id}`}>{train.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SingleTrainPage({ match }) {
  const [train, setTrain] = React.useState(null);

  React.useEffect(() => {
    const trainId = match.params.trainId;
    axios.get(`http://104.211.219.98/train/trains/2344`)
      .then(response => {
        setTrain(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [match.params.trainId]);

  if (!train) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Train Details</h2>
      <h3>{train.name}</h3>
      <p>Departure Time: {train.departureTime}</p>
      <p>Arrival Time: {train.arrivalTime}</p>
      <p>Duration: {train.duration}</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">All Trains</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/" exact component={TrainsPage} />
          <Route path="/trains/:trainId" component={SingleTrainPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;