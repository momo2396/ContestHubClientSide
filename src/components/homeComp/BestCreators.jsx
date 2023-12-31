import useGetData from "../../Routes/useGetData";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
// import "./styles.css";
const BestCreators = () => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      origin: "center",
      perView: 2,
      spacing: 10,
    },
    horizontal: true,
  });

  const { data, isLoading } = useGetData("/all-contests/popular-contests");
  if (isLoading)
    return (
      <progress className="max-w-[1400px] mx-auto progress w-56"></progress>
    );
  return (
    <div className="py-20 px-10  max-w-[1400px] mx-auto">
      <h2 className="font-bold text-black pb-5 text-3xl text-center">
        Best Creators
      </h2>
      <div ref={sliderRef} className="keen-slider" style={{ height: 300 }}>
        {data?.map((d) => (
          <div
            key={d?._id}
            className={`keen-slider__slide number-slide${d?._id} bg-[#e9c46a] flex flex-col justify-center items-center`}
          >
            <div className="flex flex-col text-lg font-bold">
              <div className="flex gap-5">
                <img
                  className="w-10 h-10 rounded-full"
                  src={d?.contestCreatorImage}
                  alt=""
                />
                <p>{d?.contestCreatorName}</p>
              </div>
              <p>{d?.contestCreatorMail}</p>
            </div>
            <div className="pt-5 flex gap-3">
              <p className="text-red-700 text-lg"> #{d?.contestType}</p>
              <p className="text-lg font-medium">{d?.contestName}</p>
            </div>
            <div>
              <p>{d?.contestDescription.split(" ").slice(0, 5).join(" ")}...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestCreators;
