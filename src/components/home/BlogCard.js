import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../assets/css/home/blogcard.css';

export default function BlogCard(props) {
  return (
    <NavLink to={`/blog/${props.slug}-${props.id}`}>
      <div className="card border-0 text-center shadow-sm">
        <img className="card-img-top" src={props.thumb} alt={props.title}></img>
        <div className="card-body">
          <h3 className="card-title">{props.title}</h3>
          <p className="card-excerpt">{props.excerpt}</p>
        </div>
      </div>
    </NavLink>
  )
}