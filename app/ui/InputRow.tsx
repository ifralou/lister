import CreateTaskActive from "@/app/assets/CreateTaskActive";
import CreateTaskNonActive from "@/app/assets/CreateTaskNonActive";
import {ChangeEventHandler, ReactNode, useState} from "react";

type InputRowProps = {
    inputValue: string,
    onInputChange: ChangeEventHandler<HTMLInputElement>,
    isActive: boolean,
    onSubmit: () => void,
    placeholders: {active: string, passive: string},
    children?: ReactNode
};
const InputRow = (
    {inputValue, onInputChange, isActive, onSubmit, placeholders, children} : InputRowProps
) => {

    const [active, setActive] = useState(false);

    async function submitOnEnter(e: any) {
        if(e.key === "Enter") {
            onSubmit();
        }
    }

    return (
        <div className={`
        flex justify-between items-center px-2
        border-2 rounded-md
        ${active ? "bg-gray-200" : "bg-gray-100"}
       `}
        >
            <div className={`flex items-center flex-grow`}>
                <div onClick={onSubmit}>
                    {isActive ? <CreateTaskActive/> : <CreateTaskNonActive/>}
                </div>
                <input placeholder={active ? placeholders.active : placeholders.passive}
                       onKeyDown={submitOnEnter}
                       className={"w-full p-2 bg-transparent outline-none"}
                       value={inputValue} onChange={onInputChange}
                       onFocus={() => setActive(true)}
                       onBlur={() => setActive(false)}
                />
            </div>
            {
                isActive && children
            }
        </div>
    );
};

export default InputRow;