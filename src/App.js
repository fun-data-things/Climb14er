import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './features/Home';
import Explore from './features/Explore';
import Plan from './features/Plan/Create';
import Navigation from './components/Navigation';
import Detail from './features/Plan/Detail';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route path="/explore" Component={Explore} />
          <Route path="/plan" Component={Plan} />
          <Route path="/plan/:id" Component={Detail} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
