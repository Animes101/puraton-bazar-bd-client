// import required modules
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import b1 from '../assets/b1.png'
import b2 from '../assets/b2.png'
import b3 from '../assets/b3.png'
import b4 from '../assets/b4.png'


const Banner = () => {
  return (
    <div className="bg-gradient-to-r from-bgGradient1 from-100% via-bgGradinet3 via-50% to-bgGradient2 to-60%">
      <div className="container mx-auto h-[800px]">
      <Swiper
        direction={"vertical"}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper w-full h-full"
      >
       
          <SwiperSlide >
            <img src={b1} alt="slide" className="w-full h-full" />
          </SwiperSlide>
           <SwiperSlide >
            <img src={b2} alt="slide" className="w-full h-full" />
          </SwiperSlide>
           <SwiperSlide >
            <img src={b3} alt="slide" className="w-full h-full" />
          </SwiperSlide>
           <SwiperSlide >
            <img src={b4} alt="slide" className="w-full h-full" />
          </SwiperSlide>
      </Swiper>
    </div>
    </div>
  );
};

export default Banner;
