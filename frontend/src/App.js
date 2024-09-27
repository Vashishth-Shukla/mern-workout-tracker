import { BrowserRouter, Routes, Route} from 'react-router-dom';

// pages and components
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Nevbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <div className="pages">
          <Routes>
            <Route 
              path='/' 
              element={
                < Home />
                }>
              </Route>

            <Route
              path='/login'
              element={
                < Login />
              }>
            </Route>

            <Route
              path='/signup'
              element={
                < Signup />
              }>
            </Route>

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
