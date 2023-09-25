import React from "react";

export const ButtonEdit = (props) => {
  const { formUtils, handleSave } = props;
  const { formData, startEdit, cancelEdit } = formUtils;

  return (
    <div>
      {!formData.isEditing ? (
        <div>
          <button
            type="button"
            className="btn btn-warning me-4"
            onClick={startEdit}
          >
            編集
          </button>
        </div>
      ) : (
        <div>
          <button
            type="button"
            className="btn btn-info me-4"
            onClick={handleSave}
          >
            保存
          </button>
          <button
            type="button"
            className="btn btn-danger me-4"
            onClick={cancelEdit}
          >
            キャンセル
          </button>
        </div>
      )}
    </div>
  );
};
