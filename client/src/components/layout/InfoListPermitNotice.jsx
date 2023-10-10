import useInfoListItemLogic from "../containers/infoListItemLogic";
import InfoListButton from "../ui/InfoListButton";

const InfoListPermitNotice = (props) => {
  const { sel } = props;
  const {
    items,
    handleCreate,
    handleSave,
    handleDelete,
    handleEdit,
    handleCancel,
    handleChange,
  } = useInfoListItemLogic(sel, "PERMIT_NOTICES");

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
          <div className="col-4">業種・種別/許可・届出番号</div>
          <div className="col-2">区分/区分</div>
          <div className="col-3">許可年月日</div>
          <div className="col-3">有効期限日</div>
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
                  name="industryType"
                  data-index={index.toString()}
                  value={item.industryType}
                  disabled={!item.isEditing}
                  onChange={handleChange}
                />
              </div>
              <div className="col-2 px-1">
                <input
                  type="text"
                  className="form-control"
                  name="approvingAuthority"
                  data-index={index.toString()}
                  value={item.approvingAuthority}
                  disabled={!item.isEditing}
                  onChange={handleChange}
                />
              </div>
              <div className="col-3 px-1">
                <input
                  type="date"
                  className="form-control"
                  name="approvalDate"
                  data-index={index.toString()}
                  value={item.approvalDate}
                  disabled={!item.isEditing}
                  onChange={handleChange}
                />
              </div>
              <div className="col-3 ps-1">
                <input
                  type="date"
                  className="form-control"
                  name="expiryDate"
                  data-index={index.toString()}
                  value={item.expiryDate}
                  disabled={!item.isEditing}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-4 pe-1">
                <input
                  type="text"
                  className="form-control"
                  name="permitNumber"
                  data-index={index.toString()}
                  value={item.permitNumber}
                  disabled={!item.isEditing}
                  onChange={handleChange}
                />
              </div>
              <div className="col-2 px-1">
                <input
                  type="text"
                  className="form-control"
                  name="permitType"
                  data-index={index.toString()}
                  value={item.permitType}
                  disabled={!item.isEditing}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6 px-1">
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

export default InfoListPermitNotice;
