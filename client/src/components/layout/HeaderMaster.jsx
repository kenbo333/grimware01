import React from "react";
import { usePathManager } from "@/components/containers/handleItem";
import { apiClient } from "../../../lib/apiClient";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const urlStrategies = {
  company: () => "/companies",
  branch: (query) => `/companies/${query.companyId}/branches`,
  employee: (query) =>
    `/companies/${query.companyId}/branches/${query.branchId}/employees`,
  car: () => "/cars",
};

export const HeaderMaster = (props) => {
  const { items, table, companyTypeField, setIsCreate } = props;
  const { pathChange, pathMove } = usePathManager();
  const router = useRouter();
  const query = router.query;
  const isStatus = query.isStatus === "false";

  //新規作成
  const createItem = async () => {
    const createDataStrategies = {
      company: { [companyTypeField]: true },
      branch: { fk_companyId: query.companyId },
      employee: {
        fk_companyId: query.companyId,
        fk_companyBranchId: query.branchId,
      },
    };

    const data = createDataStrategies[table];
    const url = urlStrategies[table](query);

    try {
      const response = await apiClient.post(url, data);
      const { id: newId } = response.data;
      await pathChange(newId, false);
      setIsCreate(true);
      console.log(`create:${newId}`);
    } catch (error) {
      console.error(error);
    }
  };

  //削除
  const deleteItem = async () => {
    if (!window.confirm("削除してもよろしいですか？")) return;

    const url = urlStrategies[table](router.query);

    try {
      await apiClient.delete(`${url}/${query.sel}`);
      pathMove(false, items, query.sel);
      toast.warn("削除しました");
    } catch (error) {
      console.log(error);
    }
  };

  //status一覧の変更
  const changeList = () => {
    const basePath = router.asPath.split("?")[0];
    router.push(
      isStatus ? basePath : { pathname: basePath, query: { isStatus: false } }
    );
  };

  return (
    <div className="bg-secondary">
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
    </div>
  );
};
