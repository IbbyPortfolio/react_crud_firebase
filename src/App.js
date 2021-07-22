import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { Route, Switch } from 'react-router-dom';
import AddEdit from './components/AddEdit';
import ListRecord from './components';

function App() {
   return (
      <div className='App'>
         <Header />
         <Switch>
            <Route exact path='/' component={ListRecord} />
            <Route exact path='/add' component={AddEdit} />
            <Route exact path='/update/:id' component={AddEdit} />
         </Switch>
      </div>
   );
}

export default App;
