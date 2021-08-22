import "./App.css";

import { Component } from 'react';
import { loadPosts } from "./utils/load-posts";
import { Posts } from "./components/Posts";

class App extends Component{
  state = {/* Estado inicial */
    posts: []
  };
  
  /* Ciclos de vida de components */
  async componentDidMount(){/* Ocorre depois da criação do componente em tela */
    await this.loadPosts();
  }
  /* 
  componentDidUpdate(){ // Ocorre após a atualização do componente 
  }
  componentWillUnmount(){// Limpa os lixos deixados do componente  
  } */
  
  loadPosts = async () =>{
    const postsAndPhotos = await loadPosts();
    this.setState({posts: postsAndPhotos});
  }
  render(){
    const {posts} = this.state;

    return (
      <section className="container">
       <Posts posts={posts}/>
      </section>
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