import useGetData from "../../Routes/useGetData";
import React, { useRef, useState } from "react";
// Import Swiper React components
// import Swiper from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
const Winners = () => {
  const { data, isLoading } = useGetData("/all-contests");
  if (isLoading)
    return (
      <progress className="max-w-[1400px] mx-auto progress w-56"></progress>
    );
  return (
    <div className="max-w-[1400px] mx-auto px-10 pt-32">
      <h2 className="text-2xl font-bold text-center ">Winners' Testimonials</h2>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {data?.map(
          (d) =>
            d?.winnerName && (
              <SwiperSlide key={d?._id}>
                <div className="pt-20 flex flex-col justify-center items-center gap-5">
                  <img
                    className="w-20 h-20 rounded-full"
                    src={d?.winnerImage}
                    alt=""
                  />
                  <p className="text-xl font-mono">Winner: {d?.winnerName}</p>
                  <p className="text-xl font-semibold">{d?.contestName}</p>
                  <p className="text-xl font-semibold">#{d?.contestType}</p>
                  <p className="text-center w-[400px]">
                    I am absolutely thrilled to have emerged as the winner of{" "}
                    <span className="font-bold">{d?.contestName} </span>
                    Participating in this contest has been an incredible
                    experience that has not only challenged my skills but also
                    provided a platform to showcase my talent.
                  </p>
                </div>
              </SwiperSlide>
            )
        )}
      </Swiper>
    </div>
  );
};
export default Winners;
