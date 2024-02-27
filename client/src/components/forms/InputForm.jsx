export const NameFrom = (props) => {
  const { title, nameKey, formUtils } = props;
  const { formData, updateObject } = formUtils;

  const handleChange = (event) => {
    const { id, value } = event.target;
    updateObject(id, value);
  };

  return (
    <div className="row">
      <label className="col-form-label col-sm-2" htmlFor={nameKey}>
        {title}
      </label>
      <div className="col-sm-10">
        <input
          type="text"
          className="form-control"
          id={nameKey}
          value={formData[nameKey] ?? ""}
          onChange={handleChange}
          disabled={!formData.isEditing}
        />
      </div>
    </div>
  );
};

//-------------------------------------------------------------------
export const HalfForm = (props) => {
  const { title, type, nameKey, formUtils } = props;
  const { formData, updateObject } = formUtils;

  const handleChange = (event) => {
    const { id, value } = event.target;
    updateObject(id, value);
  };

  return (
    <div className="row">
      <label className="col-form-label col-sm-4" htmlFor={nameKey}>
        {title}
      </label>
      <div className="col-sm-8">
        <input
          type={type}
          className="form-control"
          id={nameKey}
          value={formData[nameKey] ?? ""}
          onChange={handleChange}
          disabled={!formData.isEditing}
        />
      </div>
    </div>
  );
};

//-------------------------------------------------------------------
export const NameForm_kana = (props) => {
  const { title, nameKey, formUtils } = props;
  const { formData, updateObject } = formUtils;
  const nameKey_kana = `${nameKey}_kana`;

  const handleChange = (event) => {
    const { id, value } = event.target;
    updateObject(id, value);
  };

  return (
    <div>
      <div className="row">
        <label className="col-form-label col-sm-2" htmlFor={nameKey_kana}>
          ﾌﾘｶﾞﾅ
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id={nameKey_kana}
            value={formData[nameKey_kana] ?? ""}
            onChange={handleChange}
            disabled={!formData.isEditing}
          />
        </div>
      </div>

      <div className="row">
        <label className="col-form-label col-sm-2" htmlFor={nameKey}>
          {title}
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id={nameKey}
            value={formData[nameKey]}
            onChange={handleChange}
            disabled={!formData.isEditing}
          />
        </div>
      </div>
    </div>
  );
};

//-------------------------------------------------------------------------------
export const FullNameForm = (props) => {
  const { title, formUtils, type } = props;
  const { formData, updateObject } = formUtils;

  const fieldMapping = {
    default: {
      lastName: "lastName",
      firstName: "firstName",
      lastName_kana: "lastName_kana",
      firstName_kana: "firstName_kana",
    },
    emg: {
      lastName: "emgLastName",
      firstName: "emgFirstName",
      lastName_kana: "emgLastName_kana",
      firstName_kana: "emgFirstName_kana",
    },
  };
  const fields = fieldMapping[type] || fieldMapping.default;

  const handleChange = (event) => {
    const { id, value } = event.target;
    updateObject(id, value);
  };

  return (
    <div>
      <div className="row">
        <label
          className="col-form-label col-sm-2"
          htmlFor={fields.lastName_kana}
        >
          ﾌﾘｶﾞﾅ
        </label>
        <div className="col-sm-5">
          <input
            type="text"
            className="form-control"
            id={fields.lastName_kana}
            value={formData[fields.lastName_kana] ?? ""}
            onChange={handleChange}
            disabled={!formData.isEditing}
          />
        </div>
        <div className="col-sm-5">
          <input
            type="text"
            className="form-control"
            id={fields.firstName_kana}
            value={formData[fields.firstName_kana] ?? ""}
            onChange={handleChange}
            disabled={!formData.isEditing}
          />
        </div>
      </div>

      <div className="row">
        <label className="col-form-label col-sm-2" htmlFor={fields.lastName}>
          {title}
        </label>
        <div className="col-sm-5">
          <input
            type="text"
            className="form-control"
            id={fields.lastName}
            value={formData[fields.lastName] ?? ""}
            onChange={handleChange}
            disabled={!formData.isEditing}
          />
        </div>
        <div className="col-sm-5">
          <input
            type="text"
            className="form-control"
            id={fields.firstName}
            value={formData[fields.firstName] ?? ""}
            onChange={handleChange}
            disabled={!formData.isEditing}
          />
        </div>
      </div>
    </div>
  );
};

//---------------------------------------------------------------------------
export const SelectForm = (props) => {
  const { title, items, nameKey, viewFn, isAllowEmpty, formUtils } = props;
  const { formData, updateObject } = formUtils;
  const itemsArray = items || [];

  const handleChange = (event) => {
    const { id, value } = event.target;
    updateObject(id, value);
  };

  return (
    <div className="row">
      <label className="col-form-label col-sm-2" htmlFor={nameKey}>
        {title}
      </label>
      <div className="col-sm">
        <select
          className="form-select"
          id={nameKey}
          onChange={handleChange}
          value={formData[nameKey] ?? ""}
          disabled={!formData.isEditing}
        >
          {isAllowEmpty && <option value=""></option>}
          {itemsArray.map((item) => (
            <option key={item.id} value={item.id}>
              {viewFn(item)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

//---------------------------------------------------------------------
export const StartEndForm = (props) => {
  const { title, startKey, endKey, formUtils } = props;
  const { formData, updateObject } = formUtils;

  const handleChange = (event) => {
    const { id, value } = event.target;
    updateObject(id, value);
  };

  const handleEndDateChange = (event) => {
    const { id, value } = event.target;
    updateObject(id, value);
    // isConstructedがtrueの場合、isConstructedをfalseにリセット
    if (formData.isConstructed) {
      updateObject("isConstructed", false);
    }
  };

  const isEndDateBeforeOrToday = () => {
    if (title !== "自社工期" || formData.isConstructed) return false;
    // formDataから終了日を取得し、Dateオブジェクトを作成
    const endDate = new Date(formData.ownProjectEndDate);
    endDate.setHours(0, 0, 0, 0); // 時刻情報をクリア
    // 現在の日付を取得し、時刻情報をクリア
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // endDateがtodayと同じかそれ以前であればtrue、それ以外であればfalse
    return endDate <= today;
  };

  return (
    <div className="row">
      <label className="col-form-label col-sm-2" htmlFor={startKey}>
        {title}
      </label>
      <div className="col-sm-4 pe-0">
        <input
          type="date"
          className="form-control"
          id={startKey}
          value={formData[startKey] ?? ""}
          onChange={handleChange}
          disabled={!formData.isEditing}
        />
      </div>
      <div className="col-sm-4 ps-0">
        <input
          type="date"
          className="form-control"
          id={endKey}
          value={formData[endKey] ?? ""}
          onChange={handleEndDateChange}
          disabled={!formData.isEditing}
        />
      </div>
      {isEndDateBeforeOrToday() && (
        <button
          type="button"
          className="btn btn-success col-sm me-3"
          onClick={() => updateObject("isConstructed", true)}
        >
          工事完了
        </button>
      )}
    </div>
  );
};
