import { Link, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import MainSignedOut from './components/MainSignedOut/MainSignedOut';
import Protected from './components/Protected/Protected';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<MainSignedOut />} />
          <Route
            path="/pomo-task"
            element={
              <Protected>
                <Main />
              </Protected>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
