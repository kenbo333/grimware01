import { usePathManager } from "@/components/containers/handleItem";
import Navbar from "@/components/layout/Navbar";
import OPProject from "@/components/layout/option/OPProject";
import { useRouter } from "next/router";
import React from "react";
import { getData } from "@/utils/SSR";
import OPExpense from "@/components/layout/option/OPExpense";
import OPDaily from "@/components/layout/option/OPDaily";
import OPAnnounce from "@/components/layout/option/OPAnnounce";

export const getServerSideProps = (context) => getData("/options");

const Options = (props) => {
  const router = useRouter();
  const { sel } = router.query;
  const items = ["プロジェクト", "経費", "日報", "お知らせ"];

  const option = props.data;

  const { pathChange } = usePathManager();

  return (
    <div>
      <Navbar />

      <div className="bg-secondary">
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-success m-1"
            // onClick={createItem}
          >
            新規作成
          </button>

          <button
            type="button"
            className="btn btn-danger m-1"
            // onClick={deleteItem}
          >
            削除
          </button>
        </div>
      </div>

      <div className="container-lg my-2">
        <div className="row">
          <div className="col-3">
            {/* リスト */}
            <div className="overflow-auto" style={{ height: "750px" }}>
              <div className="list-group">
                {items.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`list-group-item ${
                      sel === item ? "active" : ""
                    }`}
                    onClick={() => pathChange(item, true)}
                    style={{ minHeight: "40px" }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="col-9">
            {sel === "プロジェクト" && <OPProject option={option} />}
            {sel === "経費" && <OPExpense option={option} />}
            {sel === "日報" && <OPDaily option={option} sel={sel} />}
            {sel === "お知らせ" && <OPAnnounce option={option} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options;
