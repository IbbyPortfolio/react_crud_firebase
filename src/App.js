import './App.css';
import Header from './components/Header';
import { Route, Switch } from 'react-router-dom';
import AddEdit from './components/AddEdit';
import ListRecord from './components';
import View from './components/View';
import About from './components/About';
import Error from './components/Error';

function App() {
   return (
      <div className='App'>
         <Header />
         <Switch>
            <Route exact path='/' component={ListRecord} />
            <Route exact path='/add' component={AddEdit} />
            <Route exact path='/update/:id' component={AddEdit} />
            <Route exact path='/view/:id' component={View} />
            <Route exact path='/about' component={About} />
            <Route path='*' component={Error} />
         </Switch>
      </div>
   );
}

export default App;
