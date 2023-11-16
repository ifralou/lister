"use client";

import {usePushStatus} from "@/utils/state/persistance";

const PersistStatus = () => {
    const status= usePushStatus();

    if(status.type === "error") {
        return <div>ERROR OCCURED</div>
    }

    if(status.type == "loading") {
        return <div>loading...</div>
    }

    return (
        <div>
            ok
        </div>
    );
};

export default PersistStatus;