import './App.css';
import Home from './Home/Home';
import Nav from './Nav/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <div className="home-wrapper">
        <Nav />
        <Home />
      </div>
    </div>
  );
}

export default App;
