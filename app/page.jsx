import Header from "@/components/Header";
import HomeInfo from "@/components/HomeInfo";
import Footer from "@/components/Footer";

function HomePage() {
  return (
    <div className=" flex flex-col relative min-h-screen">
      <Header />
      <HomeInfo />
      <Footer />
    </div>
  );
}

export default HomePage;
