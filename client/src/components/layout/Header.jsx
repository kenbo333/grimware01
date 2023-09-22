import React from "react";
import { usePathChange } from "@/components/containers/handleItem";
import apiClient from "../../../lib/apiClient";
import { useRouter } from "next/router";

const urlStrategies = {
  company: () => "/companies",
  branch: (query) => `/companies/${query.companyId}/branches`,
  employee: (query) =>
    `/companies/${query.companyId}/branches/${query.branchId}/employees`,
  car: () => "/cars",
};

export const Header = (props) => {
  const { items, type } = props;
  const { pathChange } = usePathChange();
  const router = useRouter();
  const query = router.query;
  const isStatus = query.isStatus === "false";

  //新規作成
  const createItem = async () => {
    const createDataStrategies = {
      company: { isPrime: true },
      branch: { fk_companyId: query.companyId },
      employee: {
        fk_companyId: query.companyId,
        fk_companyBranchId: query.branchId,
      },
    };

    const data = createDataStrategies[type];
    const url = urlStrategies[type](query);

    try {
      const response = await apiClient.post(url, data);
      const newId = response.data.id;
      pathChange(newId, false);
      console.log(`create:${newId}`);
    } catch (error) {
      console.error(error);
    }
  };

  //削除
  const deleteItem = async () => {
    const url = urlStrategies[type](router.query);

    try {
      const index = items.findIndex((item) => item.id === query.sel);
      await apiClient.delete(`${url}/${query.sel}`);
      //一番上以外は前の会社を選択
      if (index) {
        pathChange(items[index - 1].id, false);
      } else {
        pathChange("", false);
      }
      console.log("delete");
    } catch (error) {
      console.log(error);
    }
  };

  //status一覧の変更
  const changeList = () => {
    if (isStatus) {
      router.push(router.asPath.split("?")[0]);
    } else {
      router.push({
        pathname: router.asPath.split("?")[0],
        query: { isStatus: false },
      });
    }
  };

  return (
    <form className="bg-secondary">
      <div className="d-flex justify-content-end">
        {!isStatus && (
          <button
            type="button"
            className="btn btn-success m-1"
            onClick={createItem}
          >
            新規作成
          </button>
        )}

        <button
          type="button"
          className="btn btn-primary m-1"
          onClick={changeList}
        >
          {isStatus ? "取引中一覧へ" : "停止中一覧へ"}
        </button>

        <button
          type="button"
          className="btn btn-danger m-1"
          onClick={deleteItem}
        >
          削除
        </button>
      </div>
    </form>
  );
};