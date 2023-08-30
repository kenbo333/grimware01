import Navbar from "@/components/layout/Navbar";
import { useRouter } from "next/router";
import { ItemList } from "@/components/layout/ItemList";
import { Header } from "@/components/layout/Header";
import TabCar from "@/components/TabCar";
import apiClient from "../../../lib/apiClient";

export const getServerSideProps = async (context) => {
  try {
    const [carData, fuelData] = await Promise.all([
      apiClient.get(context.resolvedUrl),
      apiClient.get("/car/fuel"),
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

const Company = (props) => {
  // console.log(props.cars);
  const { cars, fuels } = props;
  const router = useRouter();
  const querySel = router.query.sel;

  return (
    <>
      <Navbar />
      <Header items={cars} type="car" querySel={querySel} />

      <div className="container-lg">
        <div className="row">
          <div className="col-4">
            <ItemList items={cars} type="car" querySel={querySel} />
          </div>

          {querySel ? (
            <div className="col-8">
              <TabCar cars={cars} querySel={querySel} fuels={fuels} />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Company;
