import React, { useState, useEffect } from 'react';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {categories.map((category) => (
        <div key={category.slug}>
          <h2>{category.name}</h2>
          {category.childCategories.map((childCategory) => (
            <div key={childCategory.slug} style={{ marginLeft: '20px' }}>
              <h3>{childCategory.name}</h3>
              {childCategory.grandchildCategories.map((grandchildCategory) => (
                <div key={grandchildCategory.slug} style={{ marginLeft: '40px' }}>
                  <h4>{grandchildCategory.name}</h4>
                  <ul>
                    {grandchildCategory.products.map((product) => (
                      <li key={product.id}>
                        <strong>{product.name}:</strong> {product.description}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Categories;
