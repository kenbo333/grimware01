export const AddressForm = (props) => {
  const { formUtils, type } = props;
  const { formData, updateObject } = formUtils;
  const fieldMapping = {
    default: {
      postcode: "postcode",
      address1: "address1",
      address2: "address2",
    },
    emg: {
      postcode: "emgPostcode",
      address1: "emgAddress1",
      address2: "emgAddress2",
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
        <label className="col-form-label col-sm-2" htmlFor={fields.postcode}>
          郵便番号
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id={fields.postcode}
            value={formData[fields.postcode]}
            onChange={handleChange}
            disabled={!formData.isEditing}
          />
        </div>
      </div>
      <div className="row">
        <label className="col-form-label col-sm-2" htmlFor={fields.address1}>
          住所
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id={fields.address1}
            value={formData[fields.address1]}
            onChange={handleChange}
            disabled={!formData.isEditing}
          />
        </div>
      </div>
      <div className="row">
        <label className="col-sm-2"></label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id={fields.address2}
            value={formData[fields.address2]}
            onChange={handleChange}
            disabled={!formData.isEditing}
          />
        </div>
      </div>
    </div>
  );
};
