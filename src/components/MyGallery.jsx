import React, { useState, useEffect } from 'react';
import GalleryServices from '../services/GalleryServices';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useAuth } from './useAuth';

const MyGalleries = () => {
  const [galleries, setGalleries] = useState([]);
  const {user} = useAuth();
  console.log(galleries);

  

  useEffect(() => {
    async function fetchData() {
      const response = await GalleryServices.userGalleries();
      setGalleries(response.data);
    }
    fetchData();
  }, []);

 



  return (
   <Row>
    <h1>My Gallery</h1>
    {galleries.map((gallery,index) => (
  <Col key={index} md={4}>
    <div className="card">
      <div className="card-body">
        <Card.Title>{gallery.title}</Card.Title>
        <p className="card-text">{gallery.description}</p>
        {gallery.images && (
          <img src={gallery.images[0].url} alt="Gallery" className="img-fluid" />
        )}
      </div>
    </div>
  </Col>
))}

</Row>
  );

};

export default MyGalleries;


//import React, { useState, useEffect } from "react";
// import { Button, Card } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useAuth } from "../components/useAuth";
// import useGalleries from "../hooks/useGalleries";

// const MyGalleriesPage = () => {
//   const [page, setPage] = useState(1);
//   const { myGalleries, metadata } = useGalleries(page);
//   const { token } = useAuth();

//   const handleLoadMore = () => {
//     setPage((prevPage) => prevPage + 1);
//   };

//   return (
//     <div>
//         <div>
//       <h1>My Galleries</h1>
//       </div>

//       <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
//         {myGalleries?.map((gallery, index) => (
//           <div key={index} className="col">
//             <Card>
//               <Card.Img variant="top" src={gallery.images[0]?.url} />
//               <Card.Body>
//                 <Card.Title>{gallery.title}</Card.Title>
//                 <Card.Text>{gallery.description}</Card.Text>
//                 <Link to={`/galleries/${gallery.id}`}>
//                   <Button variant="primary">View Gallery</Button>
//                 </Link>
//               </Card.Body>
//             </Card>
//           </div>
//         ))}
//       </div>
//       {myGalleries.length < metadata.total && (
//         <Button onClick={handleLoadMore}>Load More</Button>
//       )}
//     </div>
//   );
// };

// export default MyGalleriesPage;

