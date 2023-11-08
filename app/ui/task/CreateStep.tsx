import InputRow from "@/app/ui/InputRow";
import {useState} from "react";

const CreateStep = () => {
    const [step, setStep] = useState<string>("");
    return (
        <InputRow inputValue={step}
                  onInputChange={(e) => setStep(e.target.value)}
                  isActive={step.length > 0}
                  onSubmit={() => console.log("Added")}
                  placeholders={{active: "Add Step", passive: "Ex: buy apples"}}
        />
    );
};

export default CreateStep;