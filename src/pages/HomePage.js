import React from 'react';
import Header from '../components/home/Header';
import Spinner from '../components/Spinner';
import BlogList from '../components/home/BlogList';

export default class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      loading: false,
      page: 1,
      perPage: 6,
    };
    this.updatePage = this.updatePage.bind(this);
  }

  componentDidMount() {
    this.fetchBlogs();
  }

  async fetchBlogs() {
    this.setState({ loading: true, blogs: [] });
    const baseURL = 'https://epower.ng/wp-json/wp/v2/posts'; // api base url
    const url = `${baseURL}?page=${this.state.page}&per_page=${this.state.perPage}`;
    // fetch blogs
    try {
      const response = await fetch(url);
      const data = await response.json();
      // the app breaks when the word 'rendered'
      // appears as one of the keys of the objects
      // so create a temporary array with modified object keys
      let temp = [];
      data.forEach(item => {
        temp.push({
          title: item.title.rendered,
          excerpt: item.excerpt.rendered,
          featured_image_thumbnail: item.featured_image_thumbnail,
          id: item.id,
          slug: item.slug,
        });
      });
      this.updateBlogs(temp);
    } catch (error) {
      this.updateBlogs([
        {
          title: 'Failed to fetch blogs',
          excerpt: null,
          featured_image_thumbnail: null,
          id: null,
          slug: null,
        }
      ])
    }
  }

  updateBlogs(data) {
    this.setState({
      blogs: data,
      loading: false,
    });
  }

  updatePage(num) {
    const pageNumber = this.state.page + num;
    // check if already on page 1
    if (pageNumber < 2) return;

    this.setState({
      page: pageNumber,
    }, () => {
      this.fetchBlogs();
      window.scrollTo(0, 0);
    });
  }

  render() {
    return (
      <div>
        <Header />
        {/* blog list */}
        <section className="section-padding-50">
          <div className="container">
            <div className="text-center mt-5">
              <Spinner loading={this.state.loading} />
            </div>
            <BlogList blogs={this.state.blogs} />
          </div>
        </section>
        {/* pagination */}
        <section className="section-padding-50">
          <div className="container">
            <div className="row no-gutters justify-content-around">
              <button className="btn btn-primary rounded-pill px-5" onClick={() => this.updatePage(-1)}>Previous</button>
              <button className="btn btn-primary rounded-pill px-5" onClick={() => this.updatePage(1)}>Next</button>
            </div>
          </div>
        </section>
      </div>
    )
  }
}