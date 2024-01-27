import {
  useFormEditor,
  usePathManager,
  useSaveData,
} from "@/components/containers/handleItem";
import Navbar from "@/components/layout/Navbar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { apiClient } from "../../../lib/apiClient";
import { toast } from "react-toastify";
import { NameFrom, SelectForm } from "@/components/forms/InputForm";
import { ButtonEdit } from "@/components/ui/ButtonEdit";
import InfoListExpenseDetail from "@/components/layout/expense/InfoListExpenseDetail";

export const getServerSideProps = async (context) => {
  try {
    const [expenseData, empData, optionData] = await Promise.all([
      apiClient.get(`/expenses`),
      apiClient.get("/companies?isOwn=true"),
      apiClient.get("/option"),
    ]);
    return {
      props: {
        expenses: expenseData.data,
        emps: empData.data[0].companyEmployee,
        expenseAccounts: optionData.data.expenseAccount,
      },
    };
  } catch (error) {
    console.error(error);
  }
};

const Expenses = (props) => {
  const { expenses, emps, expenseAccounts } = props;
  const router = useRouter();
  const { sel } = router.query;

  const expense = expenses.find((e) => e.id === sel) || {};

  //オブジェクトから配列を除去
  const { companyEmployee, expenseDetail, ...initialData } = expense;

  const formUtils = useFormEditor(initialData);

  const { pathChange, pathMove } = usePathManager();
  const { saveData } = useSaveData();

  const handleAdd = async () => {
    try {
      const response = await apiClient.post("/expenses");
      const { id: newId } = response.data;
      await pathChange(newId, false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async () => {
    try {
      await apiClient.delete(`/expenses/${sel}`);
      pathMove(false, expenses, sel);
      toast.warn("削除しました");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    const updateData = formUtils.endEdit();
    await saveData(`/expenses/${sel}`, updateData);
    // const isStatic = car.isStatus === formData.isStatus;
    pathChange(sel, false);
  };

  return (
    <div>
      <Navbar />

      <div className="bg-secondary">
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-success m-1"
            onClick={() => handleAdd()}
          >
            新規作成
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

      <div className="container-lg">
        <div className="row my-2">
          {/* リスト */}
          <div className="col-3">
            <div className="overflow-auto" style={{ height: "750px" }}>
              <div className="list-group">
                {expenses.map((expense) => (
                  <button
                    key={expense.id}
                    type="button"
                    className={`list-group-item ${
                      sel === expense.id ? "active" : ""
                    }`}
                    onClick={() => pathChange(expense.id, true)}
                    style={{ minHeight: "40px" }}
                  >
                    {expense.companyEmployee ? (
                      <div>
                        {`${expense.companyEmployee?.lastName} ${expense.companyEmployee?.firstName}`}
                        {expense.yearMonth ? (
                          <div>{expense.yearMonth}</div>
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      "ユーザー未設定"
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 詳細 */}
          {sel && (
            <div className="col-9">
              <ButtonEdit formUtils={formUtils} handleSave={handleSave} />

              <div className="row mb-2">
                <div className="col">
                  <SelectForm
                    title="氏名"
                    items={emps}
                    nameKey="fk_companyEmployeeId"
                    viewFn={(item) => `${item.lastName} ${item.firstName}`}
                    isAllowEmpty={true}
                    formUtils={formUtils}
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col">
                  <NameFrom
                    title="年月分"
                    nameKey="yearMonth"
                    formUtils={formUtils}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">備考</div>
              </div>

              <InfoListExpenseDetail
                sel={sel}
                expenseAccounts={expenseAccounts}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Expenses;
