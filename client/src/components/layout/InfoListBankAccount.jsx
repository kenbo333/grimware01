import useInfoListItemLogic from "../containers/infoListItemLogic";
import InfoListButton from "../ui/InfoListButton";

const InfoListBankAccount = (props) => {
  const { sel } = props;
  const {
    items,
    handleCreate,
    handleSave,
    handleDelete,
    handleEdit,
    handleCancel,
    handleChange,
  } = useInfoListItemLogic(sel, "BANK_ACCOUNTS");

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
        <div className="row h6">
          <div className="col-4">銀行名/備考</div>
          <div className="col-3">支店名</div>
          <div className="col-2">預金種目</div>
          <div className="col-3">口座番号</div>
        </div>
      </div>

      <hr />
      <div>
        {items.map((item, index) => (
          <div key={item.id}>
            <div className="row">
              <div className="col-4 pe-1">
                <input
                  type="text"
                  className="form-control"
                  name="bankName"
                  data-index={index.toString()}
                  value={item.bankName}
                  disabled={!item.isEditing}
                  onChange={handleChange}
                />
              </div>
              <div className="col-3 px-1">
                <input
                  type="text"
                  className="form-control"
                  name="branchName"
                  data-index={index.toString()}
                  value={item.branchName}
                  disabled={!item.isEditing}
                  onChange={handleChange}
                />
              </div>
              <div className="col-2 px-1">
                <input
                  type="text"
                  className="form-control"
                  name="accountType"
                  data-index={index.toString()}
                  value={item.accountType}
                  disabled={!item.isEditing}
                  onChange={handleChange}
                />
              </div>
              <div className="col-3 ps-1">
                <input
                  type="text"
                  className="form-control"
                  name="accountNumber"
                  data-index={index.toString()}
                  value={item.accountNumber}
                  disabled={!item.isEditing}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <input
                  type="text"
                  className="form-control"
                  name="remark"
                  data-index={index.toString()}
                  value={item.remark}
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
    </div>
  );
};

export default InfoListBankAccount;
