import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditCategoryModal = ({ show, handleClose, category, handleSave }) => {
  const [editCategory, setEditCategory] = React.useState(category);

  React.useEffect(() => {
    setEditCategory(category);
  }, [category]);

  const handleSaveClick = () => {
    handleSave(editCategory);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCategoryName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              value={editCategory.name}
              onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSaveClick}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCategoryModal;
