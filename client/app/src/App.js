import React from 'react';
import { BrowserRouter, Switch, Route } from'react-router-dom';
import Produkter from './Components/Produkter';
import Hem from './Components/Hem';
import Omoss from './Components/Omoss'
import Header from './Components/Header';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
    <>
        <div>
          <Header />
        </div>
       <Switch>
         <Route exact path="/" render={() => <Hem/>}/>  
         <Route path="/produkter" render={() => <Produkter/>}/>
         <Route path="/omoss" render={() => <Omoss/>}/>
       </Switch>
      </>
      </BrowserRouter>
    </div>
  );
}

export default App;
