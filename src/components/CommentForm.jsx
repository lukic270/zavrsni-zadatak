import React, { useState } from 'react';
import GalleryServices from '../services/GalleryServices';

const CommentForm = ({galleryId}) => {
  const [data, setData] = useState({
    gallery_id: galleryId,
    content: ''
  });


//   const handleCreateComment = async () => {

//     try {
//         console.log(data);
//       const response = await GalleryServices.createComment(data);
//       console.log(response);
//       setData({
//         gallery_id: galleryId,
//         content: ''
//       });
//     } catch (error) {
//       if (error.response) {
//         console.error('Server error:', error.response.data);
//       } else if (error.request) {
//         console.error('Request error:', error.request);
//       } else {
//         console.error('Error:', error.message);
//       }
//     }
//   };

const handleCreateComment = async () => {
    try {
      const response = await GalleryServices.createComment(data);
      console.log(response);
  
      setData({
        gallery_id: galleryId,
        content: ''
      });
  
      window.location.reload();

    } catch (error) {
      if (error.response) {
        console.error('Server error:', error.response.data);
      } else if (error.request) {
        console.error('Request error:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    }
  };
  
  





  return (
    <div>
      <textarea value={data.content} onChange={(e) => setData({...data, content: e.target.value})} placeholder="Content" />
      <button onClick={handleCreateComment}>Create Comment</button>

    </div>
  );
};

export default CommentForm;
