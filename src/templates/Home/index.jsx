import "./styles.css";

import { Component } from 'react';
import { loadPosts } from "../../utils/load-posts";
import { Posts } from "../../components/Posts";
import { Button } from "../../components/Button";

class Home extends Component{
  state = {/* Estado inicial */
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPages: 6
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
    const {page, postsPerPages} = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPages),
      allPosts: postsAndPhotos,
    });
  }

  loadMorePosts = () =>{
    const {
      page,
      postsPerPages,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPages;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPages);
    posts.push(...nextPosts);

    this.setState({posts, page: nextPage});
  }

  render(){
    const {posts, page, postsPerPages, allPosts} = this.state;
    const noMorePosts = page + postsPerPages >= allPosts.length? true : false;

    return (
      <section className="container">
       <Posts posts={posts}/>
       <div className="button-container">
        <Button 
        disabled={noMorePosts}
        text="Load More Posts"
        onClick={this.loadMorePosts}
        />
       </div>
      </section>
    );
  
  }
}
export default Home;