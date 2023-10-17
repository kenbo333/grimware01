import Navbar from "@/components/layout/Navbar";
import { useRouter } from "next/router";
import { ItemList } from "@/components/layout/ItemList";
import { Header } from "@/components/layout/Header";
import TabCar from "@/components/layout/TabCar";
import apiClient from "../../../lib/apiClient";
import { useState } from "react";

export const getServerSideProps = async (context) => {
  try {
    const [carData, fuelData] = await Promise.all([
      apiClient.get("/cars"),
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
  const { fuels } = props;
  const router = useRouter();
  const { sel, isStatus } = router.query;
  const [isCreate, setIsCreate] = useState(false);
  const isCreateState = { isCreate, setIsCreate };

  const cars = props.cars.filter((item) =>
    isStatus === undefined ? item.isStatus : !item.isStatus
  );

  return (
    <div>
      <Navbar />
      <Header items={cars} table="car" setIsCreate={setIsCreate} />

      <div className="container-lg">
        <div className="row">
          {cars && (
            <div className="col-4">
              <ItemList items={cars} type="car" sel={sel} />
            </div>
          )}

          {sel && (
            <div className="col-8">
              <TabCar cars={cars} fuels={fuels} isCreateState={isCreateState} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Car;
