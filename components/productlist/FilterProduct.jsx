export const FilterProduct = ({ title,children }) => {

  return (
    <div className="filter-product">
      <div className="filter-product-card">
        
          <h4>{title}</h4>
        {children}
        
      </div>
    </div>
  );
};
