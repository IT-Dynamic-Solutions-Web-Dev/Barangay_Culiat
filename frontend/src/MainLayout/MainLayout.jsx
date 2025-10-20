import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navbar />
      <main className="">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
