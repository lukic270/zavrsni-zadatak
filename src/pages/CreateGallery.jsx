import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import GalleryServices from "../services/GalleryServices";
import { useAuth } from "../components/useAuth";

export default function CreateGallery() {
  const [galleryData, setGalleryData] = useState({
    title: "",
    description: "",
    images: [],
  });
  

  const{user} = useAuth();



  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGalleryData({ ...galleryData, [name]: value });
  };

  const handleImageInputChange = (e, index) => {
    const newImages = [...galleryData.images];
    newImages[index] = e.target.value;
    setGalleryData({ ...galleryData, images: newImages });
  };

  const addImageInput = () => {
    setGalleryData({ ...galleryData, images: [...galleryData.images, ""] });
  };

  const removeImageInput = (index) => {
    if (galleryData.images.length === 1) {
      return;
    }
    const newImages = [...galleryData.images];
    newImages.splice(index, 1);
    setGalleryData({ ...galleryData, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await GalleryServices.create(galleryData);
     navigate('/galleries')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <Card.Body>
        <h2>Create Gallery</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="Text"
              placeholder="Enter title"
              name="title"
              value={galleryData.title}
              onChange={handleInputChange}
              
              minLength="2"
              maxLength="255"
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              name="description"
              value={galleryData.description}
              onChange={handleInputChange}
              maxLength="1000"
            />
          </Form.Group>
          <Form.Group controlId="formImages">
            <Form.Label>Images</Form.Label>
            {galleryData.images.map((image, index) => (
              <div key={index} className="mb-2">
                <Form.Control
                  type="Url"
                  placeholder="Enter image URL"
                  value={image}
                  onChange={(e) => handleImageInputChange(e, index)}
                  required
                />
                <Button variant="secondary" size="sm" onClick={() => removeImageInput(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button variant="primary" onClick={addImageInput}>
              Add Image
            </Button>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button variant="secondary" onClick={() => navigate("/galleries")} className="ml-2">
            Cancel
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
