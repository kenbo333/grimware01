import Navbar from "@/components/layout/Navbar";
import { useRouter } from "next/router";
import { ItemList } from "@/components/layout/ItemList";
import { Header } from "@/components/layout/Header";
import TabCar from "@/components/layout/TabCar";
import apiClient from "../../../lib/apiClient";

export const getServerSideProps = async (context) => {
  try {
    const [carData, fuelData] = await Promise.all([
      apiClient.get(context.resolvedUrl),
      apiClient.get("/cars/fuel"),
    ]);
    return {
      props: {
        cars: carData.data,
        fuels: fuelData.data,
      },
    };
  } catch (error) {
    console.error(error);
  }
};

const Car = (props) => {
  // console.log(props.cars);
  const { fuels } = props;
  const router = useRouter();
  const { sel, isStatus } = router.query;

  const cars = props.cars.filter((item) =>
    isStatus === undefined ? item.isStatus : !item.isStatus
  );

  return (
    <>
      <Navbar />
      <Header items={cars} type="car" />

      <div className="container-lg">
        <div className="row">
          {cars && (
            <div className="col-4">
              <ItemList items={cars} type="car" sel={sel} />
            </div>
          )}

          {sel && (
            <div className="col-8">
              <TabCar cars={cars} fuels={fuels} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Car;
