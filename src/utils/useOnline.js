import { useEffect, useState } from "react";


const useOnline = () => {

    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        console.log("useEffect called");
        const onlineFunc = () => setIsOnline(true);
        const offlineFunc = () => setIsOnline(false);

        window.addEventListener("online", onlineFunc);
        window.addEventListener("offline", offlineFunc);

        return () => {
            window.removeEventListener("online", onlineFunc);
            window.removeEventListener("offline", offlineFunc);
        };
    }, []);

    return isOnline;
};



export default useOnline;