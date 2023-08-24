export const AddressForm = (props) => {
  //formUtils
  const { formData, updateObject } = props.formUtils;
  const { postcode, address1, address2 } = formData;

  const handleChange = (event) => {
    const { id, value } = event.target;
    updateObject(id, value);
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
