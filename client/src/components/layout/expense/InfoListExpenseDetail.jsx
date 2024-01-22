import useInfoListItemLogic from "@/components/containers/infoListItemLogic";
import InfoListButton from "@/components/ui/InfoListButton";
import React from "react";

const InfoListExpenseDetail = (props) => {
  const { sel, expenseAccounts } = props;
  const {
    items,
    handleCreate,
    handleSave,
    handleDelete,
    handleEdit,
    handleCancel,
    handleChange,
    handleCheck,
  } = useInfoListItemLogic(sel, "EXPENSE_DETAIL");

  // console.log(items);

  return (
    <div>
      <div>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleCreate}
        >
          新規作成
        </button>
        {/* <div className="row h6">
          <div className="col-3">日付/備考</div>
          <div className="col-3">内容</div>
          <div className="col-3">距離</div>
          <div className="col-3">金額</div>
        </div> */}
      </div>

      <hr />

      <div>
        {items.map((item, index) => (
          <div key={item.id}>
            <div className="row">
              <div className="col-3 pe-1">
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  data-index={index.toString()}
                  value={item.date || ""}
                  disabled={!item.isEditing}
                  onChange={handleChange}
                />
              </div>
              <div className="col-4 px-1">
                <input
                  type="text"
                  className="form-control"
                  name="fk_monthlyReportId"
                  data-index={index.toString()}
                  value={item.fk_monthlyReportId || ""}
                  disabled={!item.isEditing}
                  onChange={handleChange}
                />
              </div>
              <div className="col-2 px-1">
                <input
                  type="text"
                  className="form-control"
                  name="amount"
                  data-index={index.toString()}
                  value={item.amount || ""}
                  disabled={!item.isEditing}
                  onChange={handleChange}
                />
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    data-index={index.toString()}
                    id={`isCredit-${index}`}
                    name="isCredit"
                    checked={item.isCredit || false}
                    disabled={!item.isEditing}
                    onChange={handleCheck}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`isCredit-${index}`}
                  >
                    ｸﾚｼﾞｯﾄ
                  </label>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-3 pe-1">
                <select
                  className="form-select"
                  data-index={index.toString()}
                  name="account"
                  onChange={handleChange}
                  value={item.account || ""}
                  disabled={!item.isEditing}
                >
                  <option value=""></option>
                  {expenseAccounts.map((ea) => (
                    <option key={ea} value={ea}>
                      {ea}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-9 px-1">備考</div>
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
    </div>
  );
};

export default InfoListExpenseDetail;
