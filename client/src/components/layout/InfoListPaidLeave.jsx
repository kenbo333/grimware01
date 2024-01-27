import React from "react";
import useInfoListItemLogic from "../containers/infoListItemLogic";

const splitArrayIntoRows = (array, rowSize = 5, totalSize = 20) => {
  // 配列を指定サイズに満たす
  const fullArray = [...array];
  while (fullArray.length < totalSize) {
    fullArray.push(""); // 空の文字列で埋める
  }
  // 配列を行サイズごとに分割
  const rows = [];
  for (let i = 0; i < fullArray.length; i += rowSize) {
    rows.push(fullArray.slice(i, i + rowSize));
  }
  return rows;
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
                value={item.grantDate}
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
                value={item.expirationDate}
                disabled={!item.isEditing}
                onChange={handleChange}
              />
            </div>
            <div className="col-2 pe-1">
              <input
                className="form-control"
                name="grantDay"
                data-index={index.toString()}
                value={item.grantDay}
                disabled={!item.isEditing}
                onChange={handleChange}
              />
            </div>
            <div className="col-2 pe-1">
              {item.grantDay - item.takenDates.length}
            </div>
            <div className="col-2 pe-1">
              {/* {item.grantDay - item.takenDates.length} */}
            </div>
          </div>

          <table className="table table-bordered">
            <tbody>
              {splitArrayIntoRows(item.takenDates).map((row, i) => (
                <tr key={`row-${item.id}-${i}`}>
                  {row.map((date, j) => (
                    <td key={`cell-${item.id}-${j}`} style={{ width: "50px" }}>
                      {date}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default InfoListPaidLeave;
