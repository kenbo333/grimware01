import React, { useEffect, useState } from "react";
import apiClient from "../../../../lib/apiClient";
import { NameFrom, NameFrom_kana, SelectForm } from "../../forms/InputForm";
import { useFormEditor, usePathManager } from "../../containers/handleItem";

const RadioGroup = ({ data, selectedValue, onChange, prefix }) => (
  <div className="btn-group d-flex justify-content-center mb-4">
    {Object.entries(data).map(([key, value]) => (
      <React.Fragment key={key}>
        <input
          type="radio"
          className="btn-check"
          id={`${prefix}-${key}`}
          value={key}
          checked={selectedValue === key}
          onChange={(e) => onChange(e.target.value)}
        />
        <label className="btn btn-outline-primary" htmlFor={`${prefix}-${key}`}>
          {value || key}
        </label>
      </React.Fragment>
    ))}
  </div>
);

export const ProjectModalCreate = (props) => {
  const { items, isModalOpenState, setIsCreate } = props;
  const { isModalOpen, setIsModalOpen } = isModalOpenState;
  const [createForm, setCreateForm] = useState("");
  const [projType1, setProjType1] = useState({});
  const [projType2, setProjType2] = useState({});
  const [selectType1, setSelectType1] = useState("");
  const [selectType2, setSelectType2] = useState("");
  const [primes, setPrimes] = useState([]);
  const [closingMonth, setClosingMonth] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const formUtils = useFormEditor({
    //空欄チェック用とエラー回避の初期値
    isEditing: true,
    originalData: {},
    name: "",
    name_kana: "",
    shortName: "",
    fk_companyId_prime: "",
    fk_companyBranchId_prime: "",
    fk_companyEmployeeId_prime: "",
  });
  const { formData, updateObject, endEdit, startEdit } = formUtils;

  //select選択用
  const selectedPrime =
    primes.find((prime) => prime.id === formData.fk_companyId_prime) || {};
  const branches = selectedPrime.companyBranch || [];
  const emps =
    selectedPrime.companyEmployee?.filter(
      (emp) => emp.fk_companyBranchId === formData.fk_companyBranchId_prime
    ) || [];

  const { pathChange } = usePathManager();
  const handleCreate = async () => {
    // formData内の値に空欄が含まれているかどうかを確認する
    const hasEmptyValues = Object.values(formData).some(
      (value) => value === ""
    );
    if (!selectType1 || !selectType2 || hasEmptyValues) {
      setErrorMessage(
        "プロジェクトのタイプとすべてのフィールドを入力してください。"
      );
      return;
    }

    try {
      const newFormData = endEdit();
      const response = await apiClient.post("/generateProjectId", {
        selectType: selectType1 + selectType2,
        closingMonth,
        newFormData,
      });
      setIsModalOpen(false);
      await pathChange(response.data.id, false);
      setIsCreate(true);
    } catch (error) {
      startEdit();
      console.error(error);
    }
  };

  useEffect(() => {
    // 元請会社が変更された場合
    if (formData.fk_companyId_prime) {
      updateObject("fk_companyBranchId_prime", "");
      updateObject("fk_companyEmployeeId_prime", "");
    }
  }, [formData.fk_companyId_prime]);
  useEffect(() => {
    // 店社が変更された場合
    if (formData.fk_companyBranchId_prime) {
      updateObject("fk_companyEmployeeId_prime", "");
    }
  }, [formData.fk_companyBranchId_prime]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/options");
        const { id: t1, ...type1 } = response.data.projType1;
        const { id: t2, ...type2 } = response.data.projType2;
        setProjType1(type1);
        setProjType2(type2);
        setClosingMonth(response.data.closingMonth);
        const resPrimes = await apiClient.get("/companies?isPrime=true");
        setPrimes(resPrimes.data);
      } catch (error) {
        console.error(error);
      }
    };
    //新規作成で実行
    createForm === "new" && fetchData();
  }, [createForm]);

  return (
    <>
      <div
        className={`modal ${isModalOpen ? "d-block show" : ""}`}
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">プロジェクト作成</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setIsModalOpen(false)}
              ></button>
            </div>

            <div className="modal-body">
              <div className="d-flex justify-content-evenly mb-4">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => setCreateForm("new")}
                >
                  新規作成
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => setCreateForm("old")}
                >
                  過去を参照
                </button>
              </div>

              {createForm === "new" && (
                <div>
                  <RadioGroup
                    data={projType1}
                    selectedValue={selectType1}
                    onChange={setSelectType1}
                    prefix="projType1"
                  />
                  <RadioGroup
                    data={projType2}
                    selectedValue={selectType2}
                    onChange={setSelectType2}
                    prefix="projType2"
                  />
                  <div className="mb-2">
                    <NameFrom_kana
                      title="名称"
                      nameKey="name"
                      formUtils={formUtils}
                    />
                  </div>
                  <div className="mb-2">
                    <NameFrom
                      title="略称"
                      nameKey="shortName"
                      formUtils={formUtils}
                    />
                  </div>
                  <div>
                    <SelectForm
                      title="元請"
                      items={primes}
                      nameKey="fk_companyId_prime"
                      viewFn={(item) => item.name}
                      isAllowEmpty={true}
                      formUtils={formUtils}
                    />
                    <SelectForm
                      title="店社"
                      items={branches}
                      nameKey="fk_companyBranchId_prime"
                      viewFn={(item) => item.name}
                      isAllowEmpty={true}
                      formUtils={formUtils}
                    />
                    <SelectForm
                      title="担当"
                      items={emps}
                      nameKey="fk_companyEmployeeId_prime"
                      viewFn={(item) => `${item.lastName} ${item.firstName}`}
                      isAllowEmpty={true}
                      formUtils={formUtils}
                    />
                  </div>
                  {errorMessage && (
                    <div className="mt-2 text-danger font-weight-bold fs-6 text-center">
                      {errorMessage}
                    </div>
                  )}
                </div>
              )}

              {createForm === "old" && (
                <div className="list-group">
                  {items.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      className="list-group-item list-group-item-action"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="modal-footer justify-content-center">
              {createForm === "new" && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCreate}
                >
                  プロジェクト作成
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className={`modal-backdrop ${isModalOpen ? "show" : ""}`}></div>
      )}
    </>
  );
};
