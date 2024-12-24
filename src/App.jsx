import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({title:"" ,content:""} )
  const [isUpdating, setIsUpdating] = useState(false)
  const [currentPostId, setCurrentPostId] = useState(null)
//get the data

  useEffect( () => {
    axios.get("http://localhost:3000/posts")
    .then((res) => setPosts(res.data))
    .catch((err)=> alert(" Something went wrong is get method"))
  },[])

 // post the new data
  const addPost = () => {
    axios.post("http://localhost:3000/posts",newPost)
    .then((res) => {
      setPosts([...posts, res.data])
      setNewPost({title:"" ,content:""})
    }) 
    .catch((err)=> alert(" Something went wrong is post method"))
    
  }

  //put method
  const updatePost = () => {
     axios.put(`http://localhost:3000/posts/${currentPostId}`, newPost)
    .then((res) => {
      setPosts(posts.map((post) => post.id === currentPostId ? res.data : post))
      setNewPost({title:"" ,content:""})
      setIsUpdating(false);
      setCurrentPostId(null);
    })    .catch((err)=> alert(" Something went wrong is put method"))
  }

  //delete the post

  const deletePost = (id) =>{
    axios.delete(`http://localhost:3000/posts/${id}`)
    .then( () => {
      setPosts(posts.filter((post) => post.id !== id ));
    })
    .catch((err)=> alert(" Something went wrong is Delete method"))
  }
  

  // fill form with post "update"
  const handleEditPost = (post) => {
    setNewPost({title: post.title,content: post.content });
    setIsUpdating(true);
    setCurrentPostId(post.id);

  }
  const handleSubmit = () =>{
    if (isUpdating) {
      updatePost()
    }else{
      addPost()
    }
    
    
  }

    return (
    <>
      <nav className="navbar navbar-light bg-success px-5">
        <a href="#" className="navbar-brand">
          <h2 className="navbar-brand mb-0 h1">Madhan Crud post</h2>
        </a>
      </nav>
      <div className='container'>

        <div class="mb-3 mt-3">
                <input type="text" value={newPost.title} class="form-control mb-2" placeholder="Tittle" onChange={(e) => setNewPost({...newPost, title:e.target.value})} />
          <input type="text" value={newPost.content} class="form-control mb-2" placeholder="Content" onChange={(e) => setNewPost({...newPost, content:e.target.value})}/>
          <button  className='btn btn-success' onClick={handleSubmit}>
           {isUpdating ? "Update Post" :"Add Post" }
          </button>
        </div>

        <ul className='list-group mg-4'>
          {posts.map((post) => (
          <li key={post.id} className='list-group-item'>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <div className='d-flex gap-2'>
              <button className='btn btn-warning'onClick={() => handleEditPost(post)}>Update</button>
              <button className='btn btn-danger' onClick={() => deletePost(post.id)}>Delete</button>
            </div>
          </li>
        ))}
        </ul>
      </div>
    </>
  )
}

export default App
