import React, {ChangeEventHandler, ReactNode} from 'react';

type CreateTaskSelectorProps = {
    options: string[],
    icon: any,
    onChange: ChangeEventHandler<HTMLSelectElement>
}
const CreateTaskSelector = (
    {icon, options, onChange} : CreateTaskSelectorProps
) => {
    return (
        <div>
            <select
                onChange={onChange}
                className={`
                        bg-transparent hover:bg-gray-400
                        h-10
                        appearance-none
                        `}
                // onFocus={() => setActive(true)}
                // onBlur={() => setActive(false)}
            >
                {
                    options.map((name) => <option>{name}</option>)
                }
            </select>
        </div>
    );
};

export default CreateTaskSelector;