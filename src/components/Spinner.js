import React from 'react';

export default function Spinner(props) {
  let spinner;

  if (props.loading) {
    spinner = <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  }
  else {
    spinner = <div></div>
  }

  return spinner;
}