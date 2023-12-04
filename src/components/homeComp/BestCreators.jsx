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
    vertical: true,
  });

  const { data, isLoading } = useGetData("/all-contests/popular-contests");
  return (
    <div className="py-20 px-10 text-white max-w-[1400px] mx-auto">
      <h2 className="text-black pb-5 text-2xl text-center">Best Creators</h2>
      <div ref={sliderRef} className="keen-slider" style={{ height: 300 }}>
        {data?.map((d, i) => (
          <div
            key={d?._id}
            className={`keen-slider__slide number-slide${i} bg-amber-600 flex flex-col justify-center items-center`}
          >
            <div className="flex flex-col text-lg font-bold">
              <div className="flex gap-5">
                <img src={d?.contestCreatorImage} alt="" />
                <p>{d?.contestCreatorName}</p>
              </div>
              <p>{d?.contestCreatorMail}</p>
            </div>
            <div className="pt-5 flex gap-3">
              <p> #{d?.contestType}</p>
              <p>{d?.contestName}</p>
            </div>
            <div>
              <p>{d?.contestDescription.split(" ").slice(0, 5).join(" ")}...</p>
            </div>
          </div>
        ))}

        {/* <div className="keen-slider__slide number-slide2">2</div>
        <div className="keen-slider__slide number-slide3">3</div>
        <div className="keen-slider__slide number-slide4">4</div>
        <div className="keen-slider__slide number-slide5">5</div>
        <div className="keen-slider__slide number-slide6">6</div> */}
      </div>
    </div>
  );
};

export default BestCreators;
