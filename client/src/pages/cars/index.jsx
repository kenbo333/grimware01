import Navbar from "@/components/layout/Navbar";
import { useRouter } from "next/router";
import { ItemList } from "@/components/layout/ItemList";
import { HeaderMaster } from "@/components/layout/HeaderMaster";
import TabCar from "@/components/layout/TabCar";
import { apiClient } from "../../../lib/apiClient";
import { useState } from "react";
import { usePathManager } from "@/components/containers/handleItem";
import { getData } from "@/utils/SSR";

export const getServerSideProps = async (context) => {
  const { isStatus } = context.query;
  const statusQuery = isStatus === "false" ? "?isStatus=false" : "";
  const apiUrl = `/cars${statusQuery}`;

  return getData(apiUrl);
};

const Car = (props) => {
  const { data: cars } = props;
  const router = useRouter();
  const { sel } = router.query;
  const [isCreate, setIsCreate] = useState(false);
  const isCreateState = { isCreate, setIsCreate };

  const { pathChange } = usePathManager();
  if (cars.length > 0 && !sel) {
    pathChange(cars[0].id, true);
  }

  return (
    <div>
      <Navbar />
      <HeaderMaster items={cars} table="car" setIsCreate={setIsCreate} />

      <div className="container-lg">
        <div className="row">
          {cars && (
            <div className="col-4">
              <ItemList items={cars} type="car" sel={sel} />
            </div>
          )}

          {sel && (
            <div className="col-8">
              <TabCar cars={cars} isCreateState={isCreateState} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Car;
