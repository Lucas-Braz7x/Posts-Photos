import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component{
  /* constructor(props){
    super(props); */
    /* this.handlePClick = this.handlePClick.bind(this);/* Passa o this para dentro do método */
  state = {
    name:  'Lucas Braz',
    counter: 0
  };
  /* } */

  handlePClick = () => {
    this.setState({name: 'Junião'});
  }

  handleAClick = (event) => {/* arrow function busca o this no elemento pai */
    event.preventDefault();
    const {counter} = this.state;
    console.log(counter)
    this.setState({counter: counter+1});
  }

  render(){
    const {name, counter} = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p onClick={this.handlePClick}>
            {name} {counter}
          </p>
          <a
            onClick={this.handleAClick}
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  
  }
}

/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          É nois carai
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

export default App;