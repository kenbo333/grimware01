const InfoListButton = (props) => {
  const { isEditing, onEdit, onSave, onCancel, onDelete } = props;

  return isEditing ? (
    <div>
      <button type="button" className="btn btn-success me-4" onClick={onSave}>
        保存
      </button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        キャンセル
      </button>
    </div>
  ) : (
    <div>
      <button type="button" className="btn btn-info me-4" onClick={onEdit}>
        編集
      </button>
      <button type="button" className="btn btn-danger" onClick={onDelete}>
        削除
      </button>
    </div>
  );
};

export default InfoListButton;
