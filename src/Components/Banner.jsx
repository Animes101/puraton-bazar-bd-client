// // import required modules
// import { Pagination } from "swiper/modules";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";

// import { Swiper, SwiperSlide } from "swiper/react";
// import b1 from '../assets/b1.png'
// import b2 from '../assets/b2.png'
// import b3 from '../assets/b3.png'
// import b4 from '../assets/b4.png'


// const Banner = () => {
//   return (
//     <div className="min-h-[80vh] border border-red-500">
//       <div className="">
//       <Swiper
//         direction={"vertical"}
//         pagination={{ clickable: true }}
//         modules={[Pagination]}
//         className="mySwiper w-full h-full"
//       >
       
//           <SwiperSlide >
//             <img src={b1} alt="slide" className="w-full h-full" />
//           </SwiperSlide>
//            <SwiperSlide >
//             <img src={b2} alt="slide" className="w-full h-full" />
//           </SwiperSlide>
//            <SwiperSlide >
//             <img src={b3} alt="slide" className="w-full h-full" />
//           </SwiperSlide>
//            <SwiperSlide >
//             <img src={b4} alt="slide" className="w-full h-full" />
//           </SwiperSlide>
//       </Swiper>
//     </div>
//     </div>
//   );
// };

// export default Banner;


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
    <div className="h-[80vh] mt-[64px]">
      <Swiper
        direction="vertical"
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="w-full h-full"
      >
        <SwiperSlide>
          <img src={b1} alt="slide" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={b2} alt="slide" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={b3} alt="slide" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={b4} alt="slide" className="w-full h-full object-cover" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;

