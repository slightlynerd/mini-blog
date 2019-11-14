import React from 'react';
import { Parser } from 'html-to-react';
import Header from '../components/blog/Header';
import Spinner from '../components/Spinner';
import '../assets/css/blog/index.css';

export default class BlogPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      blog: {},
      loading: false,
    }
  }

  componentDidMount() {
    this.fetchBlog();
  }

  async fetchBlog() {
    this.setState({ loading: true });
    const { slug } = this.props.match.params;
    const slugArr = slug.split('-');
    const blogID = slugArr[slugArr.length - 1];
    const url = `https://epower.ng/wp-json/wp/v2/posts/${blogID}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.updateBlogDetails(data);
    } catch (error) {
      this.updateBlogDetails({
        title: 'Failed to fetch blog',
        date: null,
        content: null
      });
    }
  }

  updateBlogDetails(data) {
    // format date
    const date = new Date(data.date);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const formattedDate = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    this.setState({
      blog: {
        title: data.title.rendered,
        date: formattedDate,
        content: data.content.rendered,
      },
      loading: false
    });
  }

  render() {
    const htmlToReactParser = new Parser();
    const reactElement = htmlToReactParser.parse(this.state.blog.content);
    return (
      <div>
        <Header title={this.state.blog.title} date={this.state.blog.date} />
        <div className="text-center mt-5">
          <Spinner loading={this.state.loading} />
        </div>
        <section className="section-padding-50">
          <div className="container">
            {reactElement}
          </div>
        </section>
      </div>
    )
  }
}