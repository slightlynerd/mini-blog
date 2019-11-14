import React from 'react';
import '../../assets/css/home/header.css';

export default function Header(props) {
  return (
    <header className="header section-padding-40">
      <div className="container">
        <h1 className="header-text">{props.title}</h1>
        <p>PUBLISHED ON {props.date}</p>
      </div>
    </header>
  )
}