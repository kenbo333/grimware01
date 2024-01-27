import useInfoListItemLogic from "@/components/containers/infoListItemLogic";
import React from "react";

const DailyReportC = (props) => {
  const { sel } = props;

  const {
    items,
    handleCreate,
    handleSave,
    handleDelete,
    handleEdit,
    handleCancel,
    handleChange,
  } = useInfoListItemLogic(sel, "DAILY_REPORT");

  return (
    <div className="tab-pane active my-3">
      <div>
        <div className="row h6 text-center">
          <div className="col-3">会社</div>
          <div className="col-3">氏名</div>
          <div className="col-4">プロジェクト名</div>
        </div>
      </div>
    </div>
  );
};

export default DailyReportC;
