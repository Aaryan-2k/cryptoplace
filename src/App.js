import './App.css';
import NavBar from './components/NavBar'
import Search from './components/Search';
import Coins from './components/Coins';
function App() {
  return (
    <div>
      <NavBar></NavBar>
      <div class='main-container'>
        <Search/>
        <Coins/>
      </div>
    </div>
  );
}

export default App;
