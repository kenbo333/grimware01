export const SelectStatus = (props) => {
  //formUtils
  const { formData, updateObject } = props.formUtils;
  const { isStatus } = formData;

  const handleChange = (event) => {
    const { id, value } = event.target;
    updateObject(id, value === "true");
  };
  return (
    <select
      className="form-select"
      id="isStatus"
      onChange={handleChange}
      value={isStatus}
    >
      <option value="true">取引中</option>
      <option value="false">停止中</option>
    </select>
  );
};
