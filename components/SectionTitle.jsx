import React from 'react'

const SectionTitle = ({title}) => {
  return (
    <div className="section-title">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-center">
              <h3>{title}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionTitle