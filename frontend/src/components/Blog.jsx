//component for rendering info of the selected blog

//dependencies
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { like, remove } from '../reducers/blogReducer.js'
import { useParams, useNavigate } from 'react-router-dom'
import {
  createComment,
  initializeComments,
} from '../reducers/commentReducer.js'
import { Form, Button } from 'react-bootstrap'

const Blog = () => {
  /*TODO refactor styles to .css file*/
  const listStyle = {
    marginTop: 30,
    marginBottom: 0,
    paddingBottom: 30,
  }

  const noMargin2 = {
    margin: 0,
  }

  //get blog id from url
  const { id } = useParams()

  //set dispatch and navigate
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //get blogs state
  const blogs = useSelector((state) => state.blogs)
  //get find this blogs information
  const blog = blogs.find((blog) => blog.id === id)

  //get comments state
  const comments = useSelector((state) => state.comment.comments)
  //filter this blogs comments
  const commentsForBlog = blog
    ? comments.filter((comment) => comment.blog.id === blog.id)
    : []

  //get user state
  const user = useSelector((state) => state.user.user)

  //state variable for delete button
  const [deleteVisible, setDeleteVisible] = useState(false)

  useEffect(() => {
    // innitialize comments
    dispatch(initializeComments())

    // If user is not logged in navigate to home screen after a delay
    if (!user) {
      const timer = setTimeout(() => {
        navigate('/')
      }, 2000)
      return () => clearTimeout(timer)
    }

    // Show delete button if logged in user is owner of the added blog
    //console.log(`blog user = ${blog?.user?.id}`)
    //console.log(`user = ${user?.id}`)
    if (blog?.user?.id === user?.id) {
      setDeleteVisible(true)
    } else {
      setDeleteVisible(false)
      //console.log(`delete state = ${deleteVisible}`)
    }
  }, [dispatch, user, navigate, blog])

  //alterate display style according to deletevisible state
  const showDeleteButton = { display: deleteVisible ? '' : 'none' }

  // Show info if user is not logged in
  if (!user) {
    return <div className="padding">You are not logged in!</div>
  }

  //Show loading screen if blog is not ready
  if (!blog) {
    return <div>Loading...</div>
  }

  //Function for adding comments
  const addComment = (event) => {
    event.preventDefault()

    const comment = event.target.comment.value

    const addComment = {
      comment: comment,
      blog: blog.id,
    }

    dispatch(createComment(addComment))

    event.target.reset()
  }

  const deleteBlog = () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      dispatch(remove(blog))
      navigate('/')
    }
    return
  }

  // render the blog and comments comments could be as own component
  return (
    <div className="test padding">
      <h2>
        {blog.title} by author: {blog.author}
      </h2>
      <div className="paddingLeft">
        <div>
          <b>Link to the blog: </b>{' '}
          <a className="blogUrl" href={blog.url}>
            {blog.url}
          </a>
        </div>
        <div className="likes">
          <b>Likes: </b> {blog.likes}
        </div>
        <div className={'lastStyle'}>
          <b>Added by: </b> {blog.user.name}
        </div>
      </div>
      <div className={'blogButtons'}>
        <Button
          variant="primary"
          className="button-primary noMargin marginLeft"
          onClick={() => dispatch(like(blog))}
        >
          Like
        </Button>

        <Button
          variant="primary"
          style={showDeleteButton}
          className="delBlogButton delButton button-primary"
          onClick={() => {
            deleteBlog()
          }}
        >
          Delete
        </Button>
      </div>
      <h2> Comments</h2>
      <div className="paddingLeft">
        <Form onSubmit={addComment}>
          <div className="form__group">
            <input
              className="form__field"
              type="text"
              id="comment"
              data-testid="comment"
              name="comment"
              placeholder="WRITE COMMENT HERE"
              required
              minLength="5"
            />
            <label htmlFor="comment" className="form__label">
              WRITE COMMENT HERE
            </label>
          </div>
          <Button
            variant="primary"
            style={noMargin2}
            className="button-primary"
            type="submit"
          >
            Add
          </Button>
        </Form>
        <ul style={listStyle}>
          {commentsForBlog.length === 0 ? (
            <li>No comments added</li>
          ) : (
            commentsForBlog.map((comment) => (
              <li key={comment.id}>{comment.comment}</li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}

export default Blog
