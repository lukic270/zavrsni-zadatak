import { Route, Routes, Navigate } from "react-router-dom";
import GalleriesPages from "./pages/GalleriesPage";
import GalleryPage from "./pages/GalleryPage";
import CreateGalleryPage from "./pages/CreateGallery";
import RegisterPage from "./pages/Auth/register";
import LoginPage from "./pages/Auth/login";
import AuthorGalleriesPage from "./components/AuthorGalleriesPage";
import EditGalleryPage from "./components/EditGalleryPage";
import { useAuth } from "./components/useAuth"; // Prilagodite putanju prema vašem implementaciji autentifikacije
import MyGalleries from "./components/MyGallery";
export default function Router() {
  const { token,user } = useAuth(); // Koristite user iz konteksta autentifikacije

  return (
    <Routes>
      <Route path="/galleries" element={<GalleriesPages />} />
      <Route path="/galleries/:id" element={<GalleryPage />} />
      {user && (
        <>
          <Route path="/create" element={<CreateGalleryPage />} />
          <Route path="/authors/:id" element={<AuthorGalleriesPage />} />
          <Route path="/edit-gallery/:id" element={<EditGalleryPage />} />
          <Route path="/my-galleries" element={<MyGalleries />} />
        </>
      )}
        {!user && <Route path="/login" element={<LoginPage />} />}
      {!user && <Route path="/register" element={<RegisterPage />} />}
      {user && <Route path="/login" element={<Navigate to="/"/>} />}
      {user && <Route path="/register" element={<Navigate to="/"/>} />}
    </Routes>
  );
}
