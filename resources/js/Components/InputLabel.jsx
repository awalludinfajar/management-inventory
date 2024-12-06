const InputLabel = ({ value, children }) => {
    return (
        <label className="block text-sm font-medium text-gray-700 mt-2">
            {value ? <span>{value}</span> : <span>{children}</span>}
        </label>
    );
};

export default InputLabel;
