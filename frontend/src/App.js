import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages and components
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Nevbar';

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <div className="pages">
          <Routes>
            <Route 
              path='/' 
              element={ user ? < Home /> : <Navigate to="/login"></Navigate>}>
              </Route>

            <Route
              path='/login'
              element={ !user ? < Login /> : <Navigate to="/"></Navigate>}>
            </Route>

            <Route
              path='/signup'
              element={!user ? < Signup /> : <Navigate to="/"></Navigate>}>
            </Route>

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
