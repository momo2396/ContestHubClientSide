import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
const Banner = () => {
  return (
    <section>
      {/* <div
        className="bg-black bg-blend-overlay bg-opacity-60"
        style={{ backgroundImage: 'url("https://i.ibb.co/L5WZPPF/sushi.jpg")' }}
      >
        <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 text-gray-900">
          <h1 className="text-5xl font-bold leadi sm:text-6xl xl:max-w-3xl text-gray-900">
            Provident blanditiis cum exercitationem
          </h1>
          <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl text-gray-900">
            Cupiditate minima voluptate temporibus quia? Architecto beatae esse
            ab amet vero eaque explicabo!
          </p>
          <div className="flex flex-wrap justify-center">
            <button
              type="button"
              className="px-8 py-3 m-2 text-lg font-semibold rounded bg-gray-800 text-gray-50"
            >
              Get started
            </button>
            <button
              type="button"
              className="px-8 py-3 m-2 text-lg border rounded border-gray-700 text-gray-900"
            >
              Learn more
            </button>
          </div>
        </div>
      </div> */}
      <div>
        <Carousel className="">
          <div
            className="bg-cover bg-[#264653] bg-blend-overlay bg-opacity-60"
            style={{
              backgroundImage: 'url("https://i.ibb.co/L5WZPPF/sushi.jpg")',
            }}
          >
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
                  className="input input-bordered w-[500px]"
                />
              </div>
            </div>
          </div>
          <div
            className=" bg-cover bg-black bg-blend-overlay bg-opacity-60"
            style={{
              backgroundImage: 'url("https://i.ibb.co/WK657wk/OIP.jpg")',
            }}
          >
            <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32">
              <h1 className="text-white text-5xl font-bold leadi sm:text-6xl xl:max-w-3xl">
                Cooking Contest Platform
              </h1>
              <p className="text-white mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl ">
                Register Now!! Show your skill!!
              </p>
              <div className="flex flex-wrap justify-center">
                <input
                  type="text"
                  placeholder="Search here"
                  className="input input-bordered w-[500px]"
                />
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Banner;
