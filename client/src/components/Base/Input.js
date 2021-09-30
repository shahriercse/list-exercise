export const InputBox = ({ label, type = 'text', placeholder, ...props }) => {
  return (
    <div className="my-4">
      <label className="text-lg font-semibold capitalize" htmlFor={label}>
        {label}
      </label>
      <input
        className="w-full text-lg focus:outline-none border border-gray-700 rounded-lg px-4"
        type={type}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export const SelectInputBox = ({ label, name, options, onChange, value }) => {
  return (
    <div className="my-4">
      <label className="text-lg font-semibold capitalize" htmlFor={label}>
        {label}
      </label>

      <select
        name={name}
        onChange={onChange}
        value={value}
        className="w-full text-lg focus:outline-none border border-gray-700 rounded-lg px-4"
      >
        {/* <option>Select Username</option> */}
        {options.map(el => (
          <option key={el} value={el}>
            {el}
          </option>
        ))}
      </select>
    </div>
  );
};
