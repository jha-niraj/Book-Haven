import '../index.css';

const InputBox = ({ label, name, type, placeholder, id, onChange, value }) => {
    return (
        <div className="p-2 flex flex-col items-start justify-center">
            <label className='text-md font-semibold'>{label}</label>
            <input 
                type={type}
                name={name}
                id={id}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className="h-10 w-full bg-gray-200 rounded-lg focus:border-collapse pl-3 animation-all"
            />
        </div>
    )
}

export default InputBox;