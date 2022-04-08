import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

/* COMPONENTS */
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Container from './components/layout/Container';
import Message from './components/layout/Message';

/* PAGES */
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import Home from './components/pages/Home';
import Profile from './components/pages/User/Profile';
import MyPets from './components/pages/Pets/MyPets';
import AddPet from './components/pages/Pets/AddPet';

/* CONTEXT */
import {UserProvider} from './context/UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar/>
        <Message/>
        <Container>
          <Switch>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/register">
              <Register/>
            </Route>
            <Route path="/user/profile">
              <Profile/>
            </Route>
            <Route path="/pet/mypets">
              <MyPets/>
            </Route>
            <Route path="/pet/add">
              <AddPet/>
            </Route>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
        </Container>
        <Footer/>
      </UserProvider>
    </Router>
  );
}

export default App;
