import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import PopularSingle from "./PopularSingle";
import { Autoplay, Pagination } from "swiper/modules";
const Popular = () => {
  const [contests, setContests] = useState();
  useEffect(() => {
    axios
      .get(
        "https://contest-platform-server-iota.vercel.app/all-contests/popular-contests"
      )
      .then((result) => {
        setContests(result?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [contests]);
  return (
    <>
      <div className="pt-10 text-3xl font-bold text-center pb-20">
        Popular Contests
      </div>
      <Swiper
        loop={true}
        slidesPerView={1}
        // centeredSlides={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        spaceBetween={20}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          600: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper max-w-[1200px] mx-auto"
      >
        {contests
          ?.filter((f) => f?.confirmed === true)
          .map((c) => (
            <>
              <SwiperSlide>
                <PopularSingle key={c?._id} c={c}></PopularSingle>
              </SwiperSlide>
            </>
          ))}
      </Swiper>
    </>
  );
};

export default Popular;
