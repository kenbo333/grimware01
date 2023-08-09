import React from "react";
import { usePathChange } from "@/utils/handle";
import apiClient from "../../lib/apiClient";

export const CompanyHeader = ({ companies, querySel }) => {
  const { pathChange } = usePathChange();

  //新規作成
  const createCompany = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/prime", {
        f_prime: true,
      });
      const { id } = response.data;
      pathChange(id, false);
      console.log(`create:${id}`);
    } catch (err) {
      alert("err");
      console.log(err);
    }
  };

  //削除
  const deleteCompany = async (e) => {
    e.preventDefault();
    try {
      //選択した配列番号を取得
      const index = companies.findIndex((item) => item.id === querySel);
      //削除
      await apiClient.delete(`/prime/${querySel}`);
      //一番上以外は前の会社を選択
      if (index) {
        pathChange(companies[index - 1].id, false);
      } else {
        pathChange("", false);
      }
      console.log("delete");
    } catch (err) {
      alert("err");
      console.log(err);
    }
  };

  return (
    <form className="bg-secondary">
      <div className="d-flex justify-content-end">
        <button className="btn btn-success m-1" onClick={createCompany}>
          新規作成
        </button>
        <button className="btn btn-danger m-1" onClick={deleteCompany}>
          削除
        </button>
      </div>
    </form>
  );
};

//---------------------------------------
export const BranchHeader = ({ branches, querySel }) => {
  const { pathChange } = usePathChange();

  //新規作成
  const createBranch = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/prime/branch", {
        fk_companyId: branches[0].fk_companyId,
      });
      const { id } = response.data;
      pathChange(id, false);
      console.log(`create:${id}`);
    } catch (err) {
      alert("err");
      console.log(err);
    }
  };

  //削除
  const deleteBranch = async (e) => {
    e.preventDefault();
    try {
      //選択した配列番号を取得
      const index = branches.findIndex((item) => item.id === querySel);
      //削除
      await apiClient.delete(`/prime/branch/${querySel}`);
      //一番上以外は前の会社を選択
      if (index) {
        pathChange(branches[index - 1].id, false);
      } else {
        pathChange("", false);
      }
      console.log("delete");
    } catch (err) {
      alert("err");
      console.log(err);
    }
  };

  return (
    <form className="bg-secondary">
      <div className="d-flex justify-content-end">
        <button className="btn btn-success m-1" onClick={createBranch}>
          新規作成
        </button>
        <button className="btn btn-danger m-1" onClick={deleteBranch}>
          削除
        </button>
      </div>
    </form>
  );
};

//---------------------------------------
export const EmployeeHeader = ({ emps, querySel }) => {
  const { pathChange } = usePathChange();

  //新規作成
  const createEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/prime/branch/employee", {
        fk_companyId: emps[0].fk_companyId,
        fk_companyBranchId: emps[0].fk_companyBranchId,
      });
      const { id } = response.data;
      pathChange(id, false);
      console.log(`create:${id}`);
    } catch (err) {
      alert("err");
      console.log(err);
    }
  };

  //削除
  const deleteEmployee = async (e) => {
    e.preventDefault();
    try {
      //選択した配列番号を取得
      const index = emps.findIndex((item) => item.id === querySel);
      //削除
      await apiClient.delete(`/prime/branch/employee/${querySel}`);
      //一番上以外は前の会社を選択
      if (index) {
        pathChange(emps[index - 1].id, false);
      } else {
        pathChange("", false);
      }
      console.log("delete");
    } catch (err) {
      alert("err");
      console.log(err);
    }
  };

  return (
    <form className="bg-secondary">
      <div className="d-flex justify-content-end">
        <button className="btn btn-success m-1" onClick={createEmployee}>
          新規作成
        </button>
        <button className="btn btn-danger m-1" onClick={deleteEmployee}>
          削除
        </button>
      </div>
    </form>
  );
};
