// import { useParams } from "react-router-dom";
// import useGalleries from "../hooks/useGalleries";
// import { useState } from "react";
// import { Card } from "react-bootstrap";
// import LoadMoreButton from './Pagination'

// const AuthorsGalleriesPage = () => {
//   const { id } = useParams();
//   const { myGalleries, metadata } = useGalleries(page);
//   const [searchTerm, setSearchTerm] = useState("");


//   const handleLoadMore = () => {
//     setPage((prevPage) => prevPage + 1);
//   };


//   const authorGalleries = galleries.filter((gallery) => gallery.user.id === Number(id));

//   const handleSearch = (e) => {
//     e.preventDefault();
//     searchGalleries(searchTerm, id); // Dodajte id kao drugi argument za pretragu samo za autora sa odgovarajućim id
//   };

//   return (
//     <div>
//       <h2>Galerije autora</h2>
//       <form onSubmit={handleSearch} className="mb-3">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Pretraži galerije..."
//         />
//         <button type="submit">Filtriraj</button>
//       </form>
//       <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
//         {authorGalleries.map((gallery, index) => (
//           <div key={index} className="col">
//             <Card>
//               {gallery.images.length > 0 && (
//                 <Card.Img variant="top" src={gallery.images[0].url} key={index} />
//               )}
//               <Card.Body>
//                 <Card.Title>{gallery.title}</Card.Title>
//                 <Card.Text>{gallery.description}</Card.Text>
//                 <Card.Text>{gallery.user.firstName} {gallery.user.lastName}</Card.Text>
//               </Card.Body>
//             </Card>
//           </div>
//         ))}
//       </div>
//       {hasMore && <LoadMoreButton onClick={handleLoadMore} />}
//     </div>
//   );
// };

// export default AuthorsGalleriesPage;

import { useParams } from "react-router-dom";
import useGalleries from "../hooks/useGalleries";
import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";

const AuthorsGalleriesPage = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);

  const { galleries, metadata } = useGalleries(page); // Prva stranica
  const [searchTerm, setSearchTerm] = useState("");

  
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchTerm.trim()); 
    setPage(1); 
  };


  const authorGalleries = galleries.filter((gallery) => gallery.user.id === Number(id));

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

 

  return (
    <div>
      <h2>Galerije autora</h2>
      <Form onSubmit={handleSearch} className="mb-3">
        <Form.Control
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
        <Button variant="primary" type="submit">
          Filtriraj
        </Button>
      </Form>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {authorGalleries.map((gallery, index) => (
          <div key={index} className="col">
            <Card>
              {gallery.images.length > 0 && (
                <Card.Img variant="top" src={gallery.images[0].url} key={index} />
              )}
              <Card.Body>
                <Card.Title>{gallery.title}</Card.Title>
                <Card.Text>{gallery.description}</Card.Text>
                <Card.Text>{gallery.user.firstName} {gallery.user.lastName}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
       </div>
      {galleries.length < metadata.total && (
        <Button onClick={handleLoadMore}>Load More</Button>
      )}
    </div>
  );
};

export default AuthorsGalleriesPage;

