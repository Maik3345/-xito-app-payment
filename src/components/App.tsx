import * as React from 'react';
import './App.scss';
import Payment from './payment/index';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Payment />
      </div>
    );
  }
}


// Método para cargar los scripts necesarios
export default App;