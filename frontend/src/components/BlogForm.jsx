//component for rendering form for adding blogs

//dependencies
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer.js'
import { Form, Button } from 'react-bootstrap'

const BlogForm = () => {
  /*TODO refactor styles to .css file*/
  const marginBottom = {
    marginBottom: 10,
    marginLeft: 0,
  }
  //set dispatch
  const dispatch = useDispatch()

  // function for sending form content and calling createBlog
  const addBlog = (event) => {
    event.preventDefault()

    const { title, author, url } = event.target.elements

    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }

    dispatch(createBlog(blog))

    event.target.reset()
  }

  // rendering the form
  return (
    <div className="marginBlogForm">
      <h3>Add new blog to the list</h3>
      <Form onSubmit={addBlog}>
        <div className="form__group">
          <input
            className="form__field"
            type="text"
            id="title"
            data-testid="title"
            name="title"
            placeholder="TITLE"
            required
          />
          <label htmlFor="title" className="form__label">
            Title
          </label>
        </div>

        <div className="form__group">
          <input
            className="form__field"
            type="text"
            id="author"
            data-testid="author"
            name="author"
            placeholder="AUTHOR"
            required
          />
          <label htmlFor="author" className="form__label">
            Author
          </label>
        </div>
        <div className="form__group">
          <input
            className="form__field"
            type="text"
            id="url"
            data-testid="url"
            name="url"
            placeholder="URL"
            required
          />
          <label htmlFor="url" className="form__label">
            URL
          </label>
        </div>

        <p></p>
        <Button
          variant="primary"
          className="button-primary"
          style={marginBottom}
          type="submit"
        >
          Create
        </Button>
      </Form>
    </div>
  )
}

export default BlogForm
