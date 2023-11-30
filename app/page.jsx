import HompageNavbar from "@/components/HomePageNavbar";
import HomeInfo from "@/components/HomeInfo";
import Footer from "@/components/Footer";

function HomePage() {
  return (
    <div className=" flex flex-col relative min-h-screen">
      <HompageNavbar/>
      <HomeInfo />
      <Footer />
    </div>
  );
}

export default HomePage;
