export const PostCard = (props) => {
  
  return (
    <div className="post">
      <img src={props.post.cover} alt={props.post.title}/>
      <div  className="post-content">

        <h1>{props.post.title}</h1>
        <p>{props.post.body}</p>
      </div>
    </div>
  )
}