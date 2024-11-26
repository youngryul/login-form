interface FormInputProps {
    type: string;
    placeholder: string;
    errors?: string;
    name: string;
}

export default function FormInput({type, placeholder, errors, name}: FormInputProps) {
    return (
        <div className="flex flex-col gap-2">
            <input
                name={name}
                className="bg-transparent rounded-full w-full h-10 focus:outline-none p-3
                        ring-1 focus:ring-4 transition ring-neutral-200 focus:ring-blue-500 border-none
                        placeholder:text-neutral-400"
                type={type}
                placeholder={placeholder}
            />
            <span className="text-red-500 font-medium">{errors}</span>
        </div>
    );
}