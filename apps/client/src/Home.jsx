import Carousel from "./components/Carousel";
import Navbar from "./components/Navbar";
import SearchI from "./components/Search";

const Home = () => {
  return (
    <>
      <Navbar />
      <h3>Home</h3>
      <SearchI />
      <Carousel />
    </>
  )
}

export default Home;