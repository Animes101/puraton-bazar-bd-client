// // import required modules
// import { Pagination } from "swiper/modules";
// import {Link} from 'react-router-dom';

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";

// import { Swiper, SwiperSlide } from "swiper/react";

// import dslr from "../assets/cover dslr.jpg";
// import mobile from "../assets/covermobile.jpg";
// import pc from "../assets/cover pc.jpg";
// import laptop from "../assets/coverlaptop.jpg";

// const slides = [
//   {
//     img: laptop,
//     title: "Premium Laptops",
//     desc: "Find high-performance laptops for work, gaming & study.",
//     btn: "Shop Laptop",
//   },
//   {
//     img: pc,
//     title: "Powerful PCs",
//     desc: "Build or buy custom PCs with top-tier components.",
//     btn: "Shop PC",
//   },
//   {
//     img: mobile,
//     title: "Latest Smartphones",
//     desc: "Discover the newest smartphones at the best prices.",
//     btn: "Shop Mobile",
//   },
//   {
//     img: dslr,
//     title: "Professional DSLR Cameras",
//     desc: "Capture moments with high-quality DSLR cameras.",
//     btn: "Shop DSLR",
//   },
// ];

// const Banner = () => {
//   return (
//     <div className="h-[80vh] mt-[64px]">
//       <Swiper
//         direction="vertical"
//         pagination={{ clickable: true }}
//         modules={[Pagination]}
//         className="w-full h-full"
//       >
//         {slides.map((item, index) => (
//           <SwiperSlide key={index} className="relative">
//             {/* Background Image */}
//             <img
//               src={item.img}
//               alt="slide"
//               className="w-full h-full object-cover"
//             />

//             {/* Centered Text Overlay */}
//             <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-5 space-y-10">
//               <h1 className="text-4xl md:text-5xl font-bold mb-3 text-red-500">
//                 {item.title}
//               </h1>
//               {/* //slider text */}
//               <span className="text-rotate text-7xl duration-6000">
//                       <span className="justify-items-center">
//                       <span>{item.title}</span>
//                       <span className="font-bold italic px-2">Go Now ▶︎▶︎</span>
//                       </span>
//                     </span>
//               <p className="text-lg md:text-xl mb-5 max-w-xl text-bg2">
//                 {item.desc}
//               </p>
//               <Link to={'/category'} className="bg-red-500 hover:bg-red-400 px-6 py-3 rounded-md font-semibold">
//                 {item.btn}
//               </Link>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default Banner;

// Import required modules
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";

// Images
import dslr from "../assets/cover dslr.jpg";
import mobile from "../assets/covermobile.jpg";
import pc from "../assets/cover pc.jpg";
import laptop from "../assets/coverlaptop.jpg";

// Slide data
const slides = [
  {
    img: laptop,
    title: "Premium Laptops",
    desc: "Find high-performance laptops for work, gaming & study.",
    btn: "Shop Laptop",
  },
  {
    img: pc,
    title: "Powerful PCs",
    desc: "Build or buy custom PCs with top-tier components.",
    btn: "Shop PC",
  },
  {
    img: mobile,
    title: "Latest Smartphones",
    desc: "Discover the newest smartphones at the best prices.",
    btn: "Shop Mobile",
  },
  {
    img: dslr,
    title: "Professional DSLR Cameras",
    desc: "Capture moments with high-quality DSLR cameras.",
    btn: "Shop DSLR",
  },
];

const Banner = () => {
  return (
    <div className="h-[80vh] mt-[64px]">
      <Swiper
        direction="vertical"
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="w-full h-full"
      >
        {slides.map((item, index) => (
          <SwiperSlide key={index} className="relative">
            {/* Background Image */}
            <img
              src={item.img}
              alt="slide"
              className="w-full h-full object-cover"
            />

            {/* Centered Text Overlay */}
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-5 space-y-10">

              {/* Rotating Text Animation */}
              <span className="rotate-text text-btnBg text-4xl md:text-6xl font-semibold">
                <span>{item.title}</span>
                <span className="font-bold italic px-2">Go Now ▶︎▶︎</span>
              </span>

              {/* Description */}
              <p className="text-lg md:text-xl mb-5 max-w-xl text-btnBg/80">
                {item.desc}
              </p>

              {/* Button */}
              <Link
                to={"/category"}
                className="bg-btnBg hover:bg-btnBg/80 px-6 py-3 rounded-md font-semibold"
              >
                {item.btn}
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;

