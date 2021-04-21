import './App.css';
import Home from './PlantsPage/Home/Home';
import Nav from './NavBar/Nav/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <div className="home-wrapper">
        <Nav />
      </div>
    </div>
  );
}

export default App;
