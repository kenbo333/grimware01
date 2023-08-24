export const SelectStatus = (props) => {
  //formUtils
  const { formData, updateObject } = props.formUtils;
  const { f_status } = formData;

  const handleChange = (event) => {
    const { id, value } = event.target;
    updateObject(id, value === "true");
  };
  return (
    <select
      className="form-select"
      id="f_status"
      onChange={handleChange}
      value={f_status}
    >
      <option value="true">取引中</option>
      <option value="false">停止中</option>
    </select>
  );
};
