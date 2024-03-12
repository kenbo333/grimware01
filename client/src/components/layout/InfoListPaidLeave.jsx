import React from "react";
import useInfoListItemLogic from "../containers/infoListItemLogic";
import InfoListButton from "../ui/InfoListButton";

const splitArrayIntoRows = (array, rowSize = 5, totalSize = 20) => {
  // 配列を指定サイズに満たす
  const paddedArray = [
    ...array,
    ...new Array(Math.max(totalSize - array.length, 0)).fill(""),
  ];
  // 配列を行サイズごとに分割
  return Array.from(
    { length: Math.ceil(paddedArray.length / rowSize) },
    (_, i) => paddedArray.slice(i * rowSize, (i + 1) * rowSize)
  );
};

const InfoListPaidLeave = (props) => {
  const { sel } = props;
  const {
    items,
    handleCreate,
    handleSave,
    handleDelete,
    handleEdit,
    handleCancel,
    handleChange,
  } = useInfoListItemLogic(sel, "PAID_REAVES");

  // console.log(items);

  return (
    <div className="tab-pane active my-3">
      <button type="button" className="btn btn-success" onClick={handleCreate}>
        新規作成
      </button>

      <div className="row h6">
        <div className="col-3">付与日</div>
        <div className="col-3">失効日</div>
        <div className="col-2">付与日数</div>
        <div className="col-2">年次有給残</div>
        <div className="col-2">有給残</div>
      </div>

      <hr />

      {items.map((item, index) => (
        <div key={item.id}>
          <div className="row mb-2">
            <div className="col-3 pe-1">
              <input
                type="date"
                className="form-control"
                name="grantDate"
                data-index={index.toString()}
                value={item.grantDate ?? ""}
                disabled={!item.isEditing}
                onChange={handleChange}
              />
            </div>
            <div className="col-3 pe-1">
              <input
                type="date"
                className="form-control"
                name="expirationDate"
                data-index={index.toString()}
                value={item.expirationDate ?? ""}
                disabled={!item.isEditing}
                onChange={handleChange}
              />
            </div>
            <div className="col-2 pe-1">
              <input
                className="form-control"
                name="grantDay"
                data-index={index.toString()}
                value={item.grantDay ?? ""}
                disabled={!item.isEditing}
                onChange={handleChange}
              />
            </div>
            <div className="col-2 pe-1">
              {item.grantDay - item.dailyReport.length}
            </div>
          </div>

          <table className="table table-bordered">
            <tbody>
              {splitArrayIntoRows(
                item.dailyReport.map((d) => d.fk_dailyId)
              ).map((row, i) => (
                <tr key={`row-${item.id}-${i}`}>
                  {row.map((date, j) => (
                    <td
                      key={`cell-${item.id}-${i}-${j}`}
                      style={{ width: "50px" }}
                    >
                      {date}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <InfoListButton
            isEditing={item.isEditing}
            onEdit={() => handleEdit(index)}
            onSave={() => handleSave(index)}
            onCancel={() => handleCancel(index)}
            onDelete={() => handleDelete(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default InfoListPaidLeave;
