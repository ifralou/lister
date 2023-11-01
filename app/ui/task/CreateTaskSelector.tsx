import React, {ChangeEventHandler} from 'react';

type CreateTaskSelectorProps = {
    options: string[],
    onChange: ChangeEventHandler<HTMLSelectElement>
}
const CreateTaskSelector = (
    {options, onChange} : CreateTaskSelectorProps
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