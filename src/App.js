import logo from './logo.svg';
import './App.css';
import Main from './MainPage';
import Authorize from './Authorization';
import Registration from './Registration';
import { BrowserRouter,Routes,Route} from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/authorize' element={<Authorize />}></Route>
        <Route path='/registration' element={<Registration />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
