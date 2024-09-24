import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import EditCategoryModal from './EditCategoryModal';
import { useParams } from 'react-router-dom';
import HeroSection from './Hero';
import './App.css';

const CategoriesDisplay = () => {
  const { slug } = useParams();
  const [categories, setCategories] = useState([]);
  const [selectedGrandchildCategory, setSelectedGrandchildCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCategory, setEditCategory] = useState({ name: '', slug: '' });

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://3.26.215.90:5000/api/categories/${slug}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
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
  }, [slug]);

  // Handle opening the modal for editing a category
  const handleEditClick = (category) => {
    setEditCategory(category); // Set the category to be edited
    setShowEditModal(true); // Open the modal
  };

  // Handle showing products for a selected grandchild category
  const handleShowProductsClick = (grandchildCategory) => {
    setSelectedGrandchildCategory(grandchildCategory);
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  // Handle saving the edited category
  const handleSaveEdit = async (updatedCategory) => {
    try {
      // Send the updated category data to the API (assumed PUT request for update)
      const response = await fetch(`http://3.26.215.90:5000/api/categories/${updatedCategory.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCategory),
      });

      if (!response.ok) {
        throw new Error('Failed to update category');
      }

      // Update the local categories state with the updated category
      setCategories((prevCategories) => {
        return {
          ...prevCategories,
          childCategories: prevCategories.childCategories.map((cat) =>
            cat.slug === updatedCategory.slug ? updatedCategory : cat
          ),
        };
      });

      setShowEditModal(false); // Close the modal after saving
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <HeroSection />
      <Container className='test'>
        <Row>
          {categories.childCategories && categories.childCategories.map((childCategory) => (
            <Col key={childCategory.slug} xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Card className="mb-4" style={{ width: '100%', marginBottom: '1rem', border:'none' }}>
                <Card.Title style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: "black" }}>
                  <span style={{ marginRight: "1rem" }}>{childCategory.name}</span>
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleEditClick(childCategory)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </span>
                </Card.Title>
                <Card.Body className='hovcl' style={{ backgroundColor: "#202125", border: "none", borderRadius: '1rem' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '1rem' }}>
                    {childCategory.grandchildCategories && childCategory.grandchildCategories.map((grandchildCategory) => (
                      <div key={grandchildCategory.slug} style={{ marginRight: '1rem', marginBottom: '1rem' }}>
                        <h5 style={{ color: "white", display: 'inline' }}>{grandchildCategory.name}</h5>
                        <Button
                          onClick={() => handleShowProductsClick(grandchildCategory)}
                          style={{ backgroundColor: "#00b7c5", border: "none", marginLeft: '0.5rem' }}
                        >
                          Expand
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {selectedGrandchildCategory && (
          <Container className="mt-4">
            <h4>{selectedGrandchildCategory.name}</h4>
            <Row>
              {selectedGrandchildCategory.products.map((product) => (
                <Col key={product.id} xs={12} sm={6} md={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Card className="mb-4" style={{border:'none'}}>
                  <Card.Title>{product.name}</Card.Title>
                    <Card.Body style={{ backgroundColor: '#202125', borderRadius: "1rem" }}>
                      
                      <Card.Text style={{ color: 'white', fontSize:"15px" }}>{product.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        )}

        {/* Edit Category Modal */}
        <EditCategoryModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          category={editCategory}
          handleSave={handleSaveEdit}
        />
      </Container>
    </>
  );
};

export default CategoriesDisplay;
