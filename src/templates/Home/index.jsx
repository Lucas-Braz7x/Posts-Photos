import './styles.css';

import { useCallback, useEffect, useState } from 'react';
import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPages] = useState(6);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPages >= allPosts.length ? true : false;

  const filterPosts = searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const handleLoadPosts = useCallback(async (page, postsPerPages) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPages));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    handleLoadPosts(0, postsPerPages);
  }, [handleLoadPosts, postsPerPages]); //Array de dependências, sempre que a variável no array mudar o componente é re-renderizado

  const loadMorePosts = () => {
    const nextPage = page + postsPerPages;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPages);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    //this.setState({searchValue: value})
    setSearchValue(value);
  };

  return (
    <section className="container">
      <div className="searchInput">
        {!!searchValue && <h1>Pesquisar: {searchValue}</h1>}
        {/* Se não Tiver não busca não renderiza */}
        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>
      {filterPosts.length > 0 && <Posts posts={filterPosts} />}
      {filterPosts.length === 0 && <p>Não existe post com essa informação</p>}

      <div className="button-container">
        {!searchValue /* Se tiver busca não renderiza */ && (
          <Button disabled={noMorePosts} text="Load More Posts" onClick={loadMorePosts} />
        )}
      </div>
    </section>
  );
};
/* 
class Home2 extends Component{
  state = {// Estado inicial 
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPages: 6,
    searchValue: ''
  };
  
   Ciclos de vida de components 
  async componentDidMount(){// Ocorre depois da criação do componente em tela 
    await this.loadPosts();
  }
  
  componentDidUpdate(){ // Ocorre após a atualização do componente 
  }
  componentWillUnmount(){// Limpa os lixos deixados do componente  
  } 
  
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
      posts,
    } = this.state;
    const nextPage = page + postsPerPages;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPages);
    posts.push(...nextPosts);

    this.setState({posts, page: nextPage});
  }

  handleChange = event =>{
    const {value} = event.target;
    this.setState({searchValue: value})
  }

  render(){
    const {posts, page, postsPerPages, allPosts, searchValue} = this.state;
    const noMorePosts = page + postsPerPages >= allPosts.length? true : false;
    const filterPosts = !!searchValue ? allPosts.filter(post =>{
      return post.title.toLowerCase().includes(searchValue.toLowerCase())
    }) : posts;

    return (
      <section className="container">
        <div className="searchInput">
          {!!searchValue && <h1>Pesquisar: {searchValue}</h1>}{ //Se não Tiver não busca não renderiza }
          <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        </div>
        {filterPosts.length > 0 && (
           <Posts posts={filterPosts}/>
        )}
        {filterPosts.length === 0 && (
           <p>Não existe post com essa informação</p>
        )}
      
       <div className="button-container">
        {!searchValue && (// Se tiver busca não renderiza 
           <Button 
           disabled={noMorePosts}
           text="Load More Posts"
           onClick={this.loadMorePosts}
           />
        )}
       
       </div>
      </section>
    );
  
  }
}
export default Home; */
