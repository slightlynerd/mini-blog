import React from 'react';
import BlogCard from './BlogCard';

export default function BlogList(props) {
  const blogs = props.blogs;
  const listBlogs = blogs.map((blog, index) =>
    <div className="col-md-4 mb-5" key={index}>
      <BlogCard title={blog.title} excerpt={blog.excerpt} thumb={blog.featured_image_thumbnail} id={blog.id} slug={blog.slug} />
    </div>
  );
  return <div className="row justify-content-between">{listBlogs}</div>
}