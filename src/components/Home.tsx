import { PrimaryButton } from "./Buttons/Button";
import MainIcon from "../assets/png/Falcon.png";
import PlanetVehicleDetails from "../assets/png/PlanetVehicleDetails.png";
import { Link } from "react-router-dom";

// Info and instructions
const Home = () => {
  return (
    <div className="mt-14 text-white flex flex-col gap-6 justify-center items-center">
      <img src={MainIcon} alt="main-icon" height={300} width={200} />
      <p className="text-md md:text-lg xl:text-xl font-medium leading-8 md:leading-10 xl:leading-[3rem] text-gray-300 text-center">
        After the recent Falicornian war, King Shan has exiled Queen Al Falcone
        for 15 years. However, if he finds her before the 15 years are up, she
        has to go into exile for another 15 years! King Shan has received
        intelligence that Al Falcone is hiding in one of six neighbouring
        planets. In this game you have to help King Shan choose the planets to
        search, and the vehicles to use in Finding Falcone. However he has
        limited resources at his disposal and can send his army to only 4 of
        these planets. You can see the planets and the vehicles below.
      </p>
      <img src={PlanetVehicleDetails} alt="vehicle-planet-details.jpg" />
      <PrimaryButton type="button" className="mt-4">
        <Link to="play">Start game</Link>
      </PrimaryButton>
    </div>
  );
};

export default Home;
