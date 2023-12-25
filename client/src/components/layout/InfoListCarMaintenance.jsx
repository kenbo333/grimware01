import React from "react";
import useInfoListItemLogic from "../containers/infoListItemLogic";
import InfoListButton from "../ui/InfoListButton";

const InfoListCarMaintenance = (props) => {
  const { sel } = props;
  const {
    items,
    handleCreate,
    handleSave,
    handleDelete,
    handleEdit,
    handleCancel,
    handleChange,
  } = useInfoListItemLogic(sel, "CAR_MAINTENANCE");

  return (
    <div className="tab-pane fade show active my-3">
      <div>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleCreate}
        >
          新規作成
        </button>
        <div className="row h6">
          <div className="col-3">日付/備考</div>
          <div className="col-3">内容</div>
          <div className="col-3">距離</div>
          <div className="col-3">金額</div>
        </div>
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
                  value={item.date}
                  disabled={!item.isEditing}
                  onChange={handleChange}
                />
              </div>
              <div className="col-3 px-1">
                <input
                  type="text"
                  className="form-control"
                  name="content"
                  data-index={index.toString()}
                  value={item.content}
                  disabled={!item.isEditing}
                  onChange={handleChange}
                />
              </div>
              <div className="col-3 px-1">
                <input
                  type="text"
                  className="form-control"
                  name="odometer"
                  data-index={index.toString()}
                  value={item.odometer}
                  disabled={!item.isEditing}
                  onChange={handleChange}
                />
              </div>
              <div className="col-3 ps-1">
                <input
                  type="text"
                  className="form-control"
                  name="cost"
                  data-index={index.toString()}
                  value={item.cost}
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

export default InfoListCarMaintenance;
