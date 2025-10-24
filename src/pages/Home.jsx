import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import PromoSection from "../components/PromoSection";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <div>
      <Banner />
      <Categories />
      <Products />
      <PromoSection />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;
