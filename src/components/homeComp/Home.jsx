import Banner from "./Banner";
import BestCreators from "./BestCreators";
import Winners from "./Winners";
import Popular from "./popularSection/Popular";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Popular></Popular>
      <Winners></Winners>
      <BestCreators></BestCreators>
    </div>
  );
};

export default Home;
