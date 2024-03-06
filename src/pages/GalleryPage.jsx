import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, Button, Carousel } from "react-bootstrap";
import useGallery from "../hooks/useGallery";
import useComments from "../hooks/useComments";
import GalleryServices from "../services/GalleryServices";
import CommentForm from "../components/CommentForm";

export default function GallerySinglePage() {
  const { id } = useParams();
  const { gallery, deleteGallery } = useGallery(id);
  const [activeIndex, setActiveIndex] = useState(0);
  const { comments, setComments, deleteComment,galleries } = useComments();

console.log(comments);

  useEffect(() => {
  }, [comments]);

  const handleDeleteComment = async (id) => {
    const commentToDelete = comments.find(comment => comment.id === id);
    if (!commentToDelete) {
      console.error('Komentar nije pronađen');
      return;
    }
    if (window.confirm("Are you sure you want to delete this comment?")) {
      await deleteComment(id);
      setComments(comments.filter(comment => comment.id !== id));
    }
  };
   const navigate = useNavigate();

  const handleSelect = (selectedIndex, e) => {
    setActiveIndex(selectedIndex);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this gallery?")) {
      await deleteGallery();
      navigate("/galleries");
    }
  };



  const handleEdit = () => {
    navigate(`/edit-gallery/${id}`);
  };

  return (
    <div>
      <h2>Gallery Details</h2>
      <Card>
        <Card.Body>
          {gallery.response && (
            <>
              <p>Title: {gallery.response.title}</p>
              <p>Description: {gallery.response.description}</p>
              {gallery.response.user && (
                <p>
                  Author:{" "}
                  <Link to={`/authors/${gallery.response.user.id}`}>
                    {gallery.response.user.firstName} {gallery.response.user.lastName}
                  </Link>
                </p>
              )}
              {gallery.response.images && gallery.response.images.length > 0 && (
               <Carousel activeIndex={activeIndex} onSelect={handleSelect} className="carousel"   style={{ width: '70%', margin: 'auto' }}
               >
               {gallery.response.images.map((image, index) => (
                 <Carousel.Item key={index} className="carousel-item">
                   <img
                     className="d-block w-100"
                     src={image.url}
                     alt={image.alt}
                     onClick={() => window.open(image.url, "_blank")}
                   />
                 </Carousel.Item>
               ))}
             </Carousel>
              )}
              <Button variant="primary" onClick={handleEdit}>
                Edit Gallery
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete Gallery
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
      <div>
        
        <h3>Comments</h3>
        <div>

        {gallery.response?.comments.map((comment, index) => (
          
  <div key={index}>
      <p>Author: {comment?.author}</p>
    <p>Description: {comment.content}</p>
    <p>Created At: {comment.created_at}</p>
    <Button variant="danger" onClick={() => handleDeleteComment(comment.id)}>
      Delete Comment
    </Button>
  </div>
))}

          



          <div>
          {comments.length === 0 && <p>No comments yet.</p>}

            <CommentForm galleryId={id} />

          </div>

        </div>
      </div>
    </div>
  );
}


