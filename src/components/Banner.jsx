// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import "./css/banner.css";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/shop");
  };
  const handleAbout = () => {
    navigate("/about");
  };
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="relative">
            <img
              className="h-[80vh] w-full object-cover filter brightness-50"
              src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.36ixid=M3wxMjA3fDBBMHxwaG90by1wYWdlfHx8fGV"
              alt="Electronics Collection"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-start text-white px-20">
              <h2 className="text-5xl font-bold mb-4">Latest Electronics</h2>
              <p className="text-xl max-w-md mb-6">
                Discover cutting-edge technology with our newest collection of
                gadgets and devices
              </p>
              <button
                onClick={handleShopNow}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300"
              >
                Shop Now
              </button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative">
            <img
              className="h-[80vh] w-full object-cover filter brightness-50"
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.36ixid=M3wxMjA3fDBBMHxwaG90by1wYWdlfHx8fGV"
              alt="Electronics Collection"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
              <h2 className="text-5xl font-bold mb-4">Home & Living</h2>
              <p className="text-xl max-w-md mb-6">
                Elevate your style with our premium fashion collection for every
                occasion
              </p>
              <button
                onClick={handleShopNow}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300"
              >
                Explore Collection
              </button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative">
            <img
              className="h-[80vh] w-full object-cover filter brightness-50"
              src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.36ixid=M3wxMjA3fDBBMHxwaG90by1wYWdlfHx8fGV"
              alt="Electronics Collection"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-end text-white px-20">
              <h2 className="text-5xl font-bold mb-4 text-right">
                Sports & Fitness
              </h2>
              <p className="text-xl max-w-md mb-6 text-right">
                Achieve your fitness goals with professional-grade equipment and
                apparel
              </p>
              <button
                onClick={handleShopNow}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300"
              >
                Get Fit
              </button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-4.0.36ixid=M3wxMjA3fDBBMHxwaG90by1wYWdlfHx8fGV"
              className="h-[80vh] w-full object-cover filter brightness-50"
              alt="Home Decor"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
              <h2 className="text-5xl font-bold mb-4">Home & Living</h2>
              <p className="text-xl max-w-md mb-6">
                Transform your space with our exquisite home decor and furniture
                collection
              </p>
              <button
                onClick={handleAbout}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300"
              >
                Discover More
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
