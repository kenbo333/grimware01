import React from "react";
import { usePathChange } from "@/utils/handle";
import apiClient from "../../lib/apiClient";
import { useRouter } from "next/router";

export const Header = (props) => {
  const { items, type, querySel } = props;
  const { pathChange } = usePathChange();
  const router = useRouter();
  const isStatus = router.query.isStatus === "false";

  //新規作成
  const createItem = async () => {
    let data = {};
    switch (type) {
      case "company":
        data = { f_prime: true };
        break;

      case "branch":
        data = {
          fk_companyId: items[0].fk_companyId,
        };
        break;

      case "employee":
        data = {
          fk_companyId: items[0].fk_companyId,
          fk_companyBranchId: items[0].fk_companyBranchId,
        };
        break;
    }

    try {
      const response = await apiClient.post(router.asPath, data);
      const { id } = response.data;
      pathChange(id, false);
      console.log(`create:${id}`);
    } catch (error) {
      alert("error");
      console.log(error);
    }
  };

  //削除
  const deleteItem = async () => {
    try {
      const index = items.findIndex((item) => item.id === querySel);
      await apiClient.delete(router.asPath);
      //一番上以外は前の会社を選択
      if (index) {
        pathChange(items[index - 1].id, false);
      } else {
        pathChange("", false);
      }
      console.log("delete");
    } catch (error) {
      alert("error");
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
        {isStatus ? (
          <div></div>
        ) : (
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
