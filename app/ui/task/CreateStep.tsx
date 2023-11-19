import InputRow from "@/app/ui/InputRow";
import {useState} from "react";
import {usePersistence} from "@/utils/state/persistance";

const CreateStep = ({taskID} : {taskID : string}) => {
    const engine = usePersistence();

    const [step, setStep] = useState<string>("");
    return (
        <InputRow inputValue={step}
                  onInputChange={(e) => setStep(e.target.value)}
                  isActive={step.length > 0}
                  onSubmit={() => engine.addStep(step, taskID)}
                  placeholders={{active: "Add Step", passive: "Ex: buy apples"}}
        />
    );
};

export default CreateStep;