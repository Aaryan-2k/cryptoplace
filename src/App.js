import './App.css';
import Home from './pages/Home'
import NavBar from './components/NavBar'
import {Route, Routes} from 'react-router-dom'
import CoinView from './pages/CoinView'
function App() {
  return (
    <div className='themain'>
      <NavBar></NavBar>
          <Routes>
            <Route path='/' element={<Home></Home>}></Route>
          </Routes>
        <div className='cview'>
          <Routes>
            <Route path='/coin/:coinid' element={<CoinView></CoinView>}></Route>
          </Routes>
        </div>
    </div>
  );
}

export default App;
