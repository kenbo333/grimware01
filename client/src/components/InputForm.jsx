export const NameFrom = (props) => {
  //title,nameKey,formUtils
  const { formData, updateObject } = props.formUtils;
  const nameKey = props.nameKey;
  const value = formData[nameKey];

  const handleChange = (event) => {
    const { id, value } = event.target;
    updateObject(id, value);
  };

  return (
    <div>
      <div className="row">
        <label className="col-form-label col-sm-2" htmlFor={nameKey}>
          {props.title}
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id={nameKey}
            value={value}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

//-------------------------------------------------------------------
export const NameFrom_kana = (props) => {
  //title,nameKey,formUtils
  const { formData, updateObject } = props.formUtils;
  const nameKey = props.nameKey;
  const nameKey_kana = `${props.nameKey}_kana`;
  const value = formData[nameKey];
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
          />
        </div>
      </div>

      <div className="row">
        <label className="col-form-label col-sm-2" htmlFor={nameKey}>
          {props.title}
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id={nameKey}
            value={value}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

//-------------------------------------------------------------------------------
export const FullNameForm = (props) => {
  //title,formUtils
  const { title } = props;
  const { formData, updateObject } = props.formUtils;
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
          />
        </div>
        <div className="col-sm-5">
          <input
            type="text"
            className="form-control"
            id="firstName_kana"
            value={firstName_kana}
            onChange={handleChange}
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
          />
        </div>
        <div className="col-sm-5">
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={firstName}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

//---------------------------------------------------------------------------
export const SelectForm = (props) => {
  //title,items,nameKey,viewKey,formUtils
  const { title, items, nameKey, viewKey } = props;
  const { formData, updateObject } = props.formUtils;
  const value = formData[nameKey];

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
          value={value}
        >
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
  const { title, startKey, endKey } = props;
  const startValue = props.formData[startKey];
  const endValue = props.formData[endKey];

  const handleChange = (event) => {
    const { id, value } = event.target;
    props.updateObject(id, value);
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
            value={startValue || ""}
            onChange={handleChange}
          />
        </div>
        <div className="col-sm-4 ps-0">
          <input
            type="text"
            className="form-control"
            id={endValue}
            value={endValue || ""}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};
