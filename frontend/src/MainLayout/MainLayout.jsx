import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-neutral">
      <Navbar />
      <main className="">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
