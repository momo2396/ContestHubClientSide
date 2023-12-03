import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
const Banner = () => {
  const comp = (
    <>
      <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 ">
        <h1 className="text-white text-5xl font-bold leadi sm:text-6xl xl:max-w-3xl">
          Cooking Contest Platform
        </h1>
        <p className="text-white  mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl ">
          Register Now!! Show your skill!!
        </p>
        <div className="flex flex-wrap justify-center">
          <input
            type="text"
            placeholder="Search here"
            className="input input-bordered w-full"
          />
        </div>
      </div>
    </>
  );
  return (
    <section>
      <div>
        <Carousel className="">
          <div
            className="bg-cover bg-[#264653] bg-blend-overlay bg-opacity-60"
            style={{
              backgroundImage: 'url("https://i.ibb.co/L5WZPPF/sushi.jpg")',
            }}
          >
            {comp}
          </div>
          <div
            className=" bg-cover bg-black bg-blend-overlay bg-opacity-60"
            style={{
              backgroundImage: 'url("https://i.ibb.co/WK657wk/OIP.jpg")',
            }}
          >
            {comp}
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Banner;
