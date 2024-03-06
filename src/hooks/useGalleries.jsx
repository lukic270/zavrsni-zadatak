// import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import GalleryServices from "../services/GalleryServices";

const PER_PAGE = 10;

export default function useGalleries(page, search, perPage) {
  const [galleries, setGalleries] = useState([]);
  const [metadata, setMetadata] = useState({ total: 0, count: 0, perPage: PER_PAGE });

  useEffect(() => {
    fetchGalleries();
  }, [page, search, perPage]);

  async function fetchGalleries() {
    try {
      const { data, metadata } = await GalleryServices.GetAll(page, search);
      if (page === 1) {
        setGalleries(data);
      } else {
        setGalleries((prevGalleries) => [...prevGalleries, ...data]);
      }
      if (metadata) setMetadata(metadata);
    } catch (error) {
      console.log(error);
    }
  }

 

  return { galleries, metadata };
}
