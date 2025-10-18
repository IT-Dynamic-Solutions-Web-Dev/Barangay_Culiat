import Navbar from "./Navbar";
import Header from "./Header";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navbar />
      <main className="">{children}</main>
    </div>
  );
};

export default MainLayout;
