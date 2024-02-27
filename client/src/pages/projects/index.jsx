import { HeaderProject } from "@/components/layout/project/HeaderProject";
import { ItemList } from "@/components/layout/ItemList";
import Navbar from "@/components/layout/Navbar";
import TabProject from "@/components/layout/project/TabProject";
import { getData } from "@/utils/SSR";
import { useRouter } from "next/router";
import { useState } from "react";

export const getServerSideProps = (context) => getData("/projects");

const Project = (props) => {
  const projects = props.data;
  const router = useRouter();
  const { sel, isStatus } = router.query;
  const [isCreate, setIsCreate] = useState(false);
  const isCreateState = { isCreate, setIsCreate };

  // console.log(projects);

  return (
    <div>
      <Navbar />
      <HeaderProject items={projects} setIsCreate={setIsCreate} />

      <div className="container-lg">
        <div className="row">
          {projects && (
            <div className="col-4">
              <ItemList items={projects} type="project" sel={sel} />
            </div>
          )}

          {sel && (
            <div className="col-8">
              <TabProject
                projects={projects}
                isCreateState={isCreateState}
                sel={sel}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
