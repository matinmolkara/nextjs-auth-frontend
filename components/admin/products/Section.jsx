    import React from 'react'
const Section = ({ title, id, children }) => {
  return (
    <div className="card mb-4" id={id}>
      {title && (
        <div className="card-header">
          <h5>{title}</h5>
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
}
    export default Section;

    