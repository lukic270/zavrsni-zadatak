import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import GalleryServices from "../services/GalleryServices";
import { useAuth } from "./useAuth";

export default function EditGalleryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gallery, setGallery] = useState({});
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, token } = useAuth();

  useEffect(() => {
    async function fetchData() {
      const response = await GalleryServices.getSingleGallery(id);
      setGallery(response.response);
    }

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await GalleryServices.updateGallery(id, formData);
      navigate(`/galleries/${id}`);
      console.log("FormData:", formData); 

    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Edit Gallery</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title || gallery.title || ""}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description || gallery.description || ""}
            onChange={handleChange}
          />
        </Form.Group>
      
        <Form.Group controlId="imageUrl">
  <Form.Label>Image URL</Form.Label>
  <Form.Control
    type="url"
    name="imageUrl"
    value={formData.imageUrl || gallery.imageUrl || ""}
    onChange={handleChange}
  />
</Form.Group>
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </Form>
    </div>
  );
}



