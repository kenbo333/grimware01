const options = [
  { value: "isPrime", label: "元請会社" },
  { value: "isSub", label: "下請会社" },
  { value: "isPurchase", label: "仕入会社" },
];

export const TransactionType = (props) => {
  const { formData, updateCheckbox } = props.formUtils;

  const handleChange = (event) => {
    const { id } = event.target;
    updateCheckbox(id);
  };

  return (
    <div className="row align-items-center">
      <div className="col-sm-2">取引種別</div>
      <div className="col">
        {options.map((option) => (
          <div key={option.value} className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id={option.value}
              checked={formData[option.value] || false}
              onChange={handleChange}
              disabled={!formData.isEditing}
            />
            <label className="form-check-label" htmlFor={option.value}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
