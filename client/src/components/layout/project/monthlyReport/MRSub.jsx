import React from "react";
import useInfoListItemLogic from "@/components/containers/infoListItemLogic";
import InfoListButton from "@/components/ui/InfoListButton";
import { useFetchSingle } from "@/components/containers/useFetchData";

const MRSub = (props) => {
  const { sel, projectId } = props;

  const {
    items,
    handleCreate,
    handleSave,
    handleDelete,
    handleEdit,
    handleCancel,
    handleChange,
  } = useInfoListItemLogic(sel, "MONTHLY_REPORTS_SUBS");

  const {
    data: subs,
    error,
    isLoading,
  } = useFetchSingle(`/projectCompanies/subs/${projectId}`);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  // console.log(subs);

  return (
    <div className="tab-pane active my-3">
      <div>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleCreate}
        >
          新規作成
        </button>
        <div className="row h6">
          <div className="col-5">下請会社名</div>
          <div className="col-4">下請店社名</div>
          <div className="col-3">金額</div>
        </div>
        <div className="row h6">
          <div className="col-5">工事項目</div>
          <div className="col-7">備考</div>
        </div>
      </div>

      <hr />

      {items.map((item, index) => (
        <div key={item.id}>
          <div className="row">
            <div className="col-5 px-1">
              <select
                className="form-select"
                name="fk_companyId"
                data-index={index.toString()}
                value={item.fk_companyId ?? ""}
                disabled={!item.isEditing}
                onChange={handleChange}
              >
                <option value=""></option>
                {subs.map((sub) => (
                  <option key={sub.id} value={sub.fk_companyId}>
                    {sub.company.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-4 px-1">
              <select
                className="form-select"
                name="fk_companyBranchId"
                data-index={index.toString()}
                value={item.fk_companyBranchId ?? ""}
                disabled={!item.isEditing}
                onChange={handleChange}
              >
                <option value=""></option>
                {subs
                  .find((sub) => sub.fk_companyId === item.fk_companyId)
                  ?.company.companyBranch.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-3 px-1">
              <input
                type="text"
                className="form-control"
                name="paymentAmount"
                data-index={index.toString()}
                value={item.paymentAmount ?? ""}
                disabled={!item.isEditing}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-5 pe-1">
              <input
                className="form-control"
                name="description"
                data-index={index.toString()}
                value={item.description ?? ""}
                disabled={!item.isEditing}
                onChange={handleChange}
              />
            </div>
          </div>

          <InfoListButton
            isEditing={item.isEditing}
            onEdit={() => handleEdit(index)}
            onSave={() => handleSave(index)}
            onCancel={() => handleCancel(index)}
            onDelete={() => handleDelete(index)}
          />
          <hr />
        </div>
      ))}
    </div>
  );
};

export default MRSub;
