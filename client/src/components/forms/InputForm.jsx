export const NameFrom = (props) => {
  const { title, nameKey, formUtils } = props;
  const { formData, updateObject } = formUtils;

  const handleChange = (event) => {
    const { id, value } = event.target;
    updateObject(id, value);
  };

  return (
    <div>
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

//-------------------------------------------------------------------
export const NameFrom_kana = (props) => {
  const { title, nameKey, formUtils } = props;
  const { formData, updateObject } = formUtils;
  const nameKey_kana = `${nameKey}_kana`;
  const value_kana = formData[nameKey_kana];

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
            value={value_kana}
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
  const { title, formUtils } = props;
  const { formData, updateObject } = formUtils;
  const { lastName, firstName, lastName_kana, firstName_kana } = formData;

  const handleChange = (event) => {
    const { id, value } = event.target;
    updateObject(id, value);
  };

  return (
    <div>
      <div className="row">
        <label className="col-form-label col-sm-2" htmlFor="lastName_kana">
          ﾌﾘｶﾞﾅ
        </label>
        <div className="col-sm-5">
          <input
            type="text"
            className="form-control"
            id="lastName_kana"
            value={lastName_kana}
            onChange={handleChange}
            disabled={!formData.isEditing}
          />
        </div>
        <div className="col-sm-5">
          <input
            type="text"
            className="form-control"
            id="firstName_kana"
            value={firstName_kana}
            onChange={handleChange}
            disabled={!formData.isEditing}
          />
        </div>
      </div>

      <div className="row">
        <label className="col-form-label col-sm-2" htmlFor="lastName">
          {title}
        </label>
        <div className="col-sm-5">
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={lastName}
            onChange={handleChange}
            disabled={!formData.isEditing}
          />
        </div>
        <div className="col-sm-5">
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={firstName}
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
  const { title, items, nameKey, viewKey, isAllowEmpty, formUtils } = props;
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
      <div className="col-sm">
        <select
          className="form-select"
          id={nameKey}
          onChange={handleChange}
          value={formData[nameKey]}
          disabled={!formData.isEditing}
        >
          {isAllowEmpty && <option value=""></option>}
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item[viewKey]}
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
  return (
    <div>
      <div className="row">
        <label className="col-form-label col-sm-2" htmlFor={startKey}>
          {title}
        </label>
        <div className="col-sm-4 pe-0">
          <input
            type="text"
            className="form-control"
            id={startKey}
            value={formData[startKey] || ""}
            onChange={handleChange}
            disabled={!formData.isEditing}
          />
        </div>
        <div className="col-sm-4 ps-0">
          <input
            type="text"
            className="form-control"
            id={endKey}
            value={formData[endKey] || ""}
            onChange={handleChange}
            disabled={!formData.isEditing}
          />
        </div>
      </div>
    </div>
  );
};
