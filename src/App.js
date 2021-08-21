import "./App.css"
import { Component } from 'react';
import { PostCard } from "./components/PostCard";

class App extends Component{
  state = {/* Estado inicial */
    posts: []
  };
  
  /* Ciclos de vida de components */
  componentDidMount(){/* Ocorre depois da criação do componente em tela */
    this.loadPosts();
  }
  /* 
  componentDidUpdate(){ // Ocorre após a atualização do componente 
  }
  componentWillUnmount(){// Limpa os lixos deixados do componente  
  } */
  
  loadPosts = async () =>{
    const postResponse = fetch("https://jsonplaceholder.typicode.com/posts");
    const photoResponse = fetch("https://jsonplaceholder.typicode.com/photos");
    
    const [posts, photos] = await Promise.all([postResponse, photoResponse]);
    
    const postsJson = await posts.json();
    const photoJson = await photos.json();

    const postsAndPhotos = postsJson.map((post, index) => {
      return{...post, cover: photoJson[index].url};
    });

    this.setState({posts: postsAndPhotos});
  }
  render(){
    const {posts} = this.state;

    return (
      <section className="container">
        <div className="posts">
          {posts.map(post =>(
            <PostCard key={post.id} post={post}/>
          )
          )}
        </div>
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