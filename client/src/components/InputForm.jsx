export const NameFrom_kana = (props) => {
  //title,nameKey,formData,updateObject
  const nameKey = props.nameKey;
  const nameKey_kana = `${props.nameKey}_kana`;
  const value = props.formData[nameKey];
  const value_kana = props.formData[nameKey_kana];

  const handleChange = (event) => {
    const { id, value } = event.target;
    props.updateObject(id, value);
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

//
export const NameFrom = (props) => {
  //title,nameKey,formData,updateObject
  const nameKey = props.nameKey;
  const value = props.formData[nameKey];

  const handleChange = (event) => {
    const { id, value } = event.target;
    props.updateObject(id, value);
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

//
export const FullNameForm = (props) => {
  //title,formData,updateObject
  const { lastName, firstName, lastName_kana, firstName_kana } = props.formData;

  const handleChange = (event) => {
    const { id, value } = event.target;
    props.updateObject(id, value);
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
          {props.title}
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

//
export const AddressForm = (props) => {
  //formData,updateObject
  const { postcode, address1, address2 } = props.formData;

  const handleChange = (event) => {
    const { id, value } = event.target;
    props.updateObject(id, value);
  };

  return (
    <div>
      <div className="row">
        <label className="col-form-label col-sm-2" htmlFor="postcode">
          郵便番号
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="postcode"
            value={postcode}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <label className="col-form-label col-sm-2" htmlFor="address1">
          住所
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="address1"
            value={address1}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <label className="col-sm-2"></label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="address2"
            value={address2}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

//生年月日
export const BirthdateForm = (props) => {
  //formData,updateObject
  const { birthYear, birthMonth, birthDay } = props.formData;

  const inputYears = [...Array(101).keys()].map(
    (i) => new Date().getFullYear() - i
  );
  const inputMonths = [...Array(12).keys()].map((i) => i + 1);
  const inputDays = [...Array(31).keys()].map((i) => i + 1);

  const handleChange = (event) => {
    const { id, value } = event.target;
    props.updateObject(id, value);
  };

  //年齢計算
  const calculateAge = (year, month, day) => {
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <div>
      <div className="row">
        <label className="col-form-label col-sm-2" htmlFor="birthYear">
          生年月日
        </label>
        <div className="col-sm-3">
          <select
            className="form-select"
            id="birthYear"
            onChange={handleChange}
            value={birthYear || ""}
          >
            <option value=""></option>
            {inputYears.map((inputYear) => (
              <option key={inputYear} value={inputYear}>
                {inputYear}
              </option>
            ))}
          </select>
        </div>
        <div className="col-sm-2">
          <select
            className="form-select"
            id="birthMonth"
            onChange={handleChange}
            value={birthMonth || ""}
          >
            <option value=""></option>
            {inputMonths.map((inputMonth) => (
              <option key={inputMonth} value={inputMonth}>
                {inputMonth}
              </option>
            ))}
          </select>
        </div>
        <div className="col-sm-2">
          <select
            className="form-select"
            id="birthDay"
            onChange={handleChange}
            value={birthDay || ""}
          >
            <option value=""></option>
            {inputDays.map((inputDay) => (
              <option key={inputDay} value={inputDay}>
                {inputDay}
              </option>
            ))}
          </select>
        </div>

        <div className="col-sm-2">
          {birthYear && birthMonth && birthDay ? (
            <input
              type="text"
              className="form-control"
              value={`${calculateAge(birthYear, birthMonth, birthDay)}歳`}
              disabled
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export const FormSelect = (props) => {
  //title,items,nameKey,formData,updateObject
  const { title, items, nameKey } = props;
  const value = props.formData[nameKey];

  const handleChange = (event) => {
    const { id, value } = event.target;
    props.updateObject(id, value);
  };

  return (
    <div className="row">
      <label className="col-form-label col-sm-2" htmlFor={title}>
        {title}
      </label>
      <div className="col-sm">
        <select
          className="form-select"
          id={title}
          onChange={handleChange}
          value={value}
        >
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.branchName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
