"use client";

import {usePushStatus} from "@/utils/state/persistance";
import {Button} from "@nextui-org/react";

const PersistStatus = () => {
    const status= usePushStatus();

    if(status.type === "error") {
        return <div>ERROR OCCURED</div>
    }


    return (
        <Button isDisabled isLoading={status.type == "loading"}>
            {
                status.type == "loading"?
                    "Loading" : "Synchronized"
            }
        </Button>
    );
};

export default PersistStatus;