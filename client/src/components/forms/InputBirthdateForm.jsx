export const BirthdateForm = (props) => {
  //formUtils
  const { formData, updateObject } = props.formUtils;
  const { birthYear, birthMonth, birthDay } = formData;

  const inputYears = [...Array(101).keys()].map(
    (i) => new Date().getFullYear() - i
  );
  const inputMonths = [...Array(12).keys()].map((i) => i + 1);
  const inputDays = [...Array(31).keys()].map((i) => i + 1);

  const handleChange = (event) => {
    const { id, value } = event.target;
    updateObject(id, value);
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
            value={birthYear ?? ""}
            disabled={!formData.isEditing}
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
            value={birthMonth ?? ""}
            disabled={!formData.isEditing}
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
            value={birthDay ?? ""}
            disabled={!formData.isEditing}
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
          {birthYear && birthMonth && birthDay && (
            <input
              type="text"
              className="form-control"
              value={`${calculateAge(birthYear, birthMonth, birthDay)}歳`}
              disabled
            />
          )}
        </div>
      </div>
    </div>
  );
};
