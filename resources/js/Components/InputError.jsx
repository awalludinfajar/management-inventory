const InputError = ({ message }) => {
    if (!message) {
        return null;
    }

    return (
        <div>
            <p className="text-sm text-red-600">{message}</p>
        </div>
    );
};

export default InputError;
