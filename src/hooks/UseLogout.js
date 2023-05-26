import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { UseAuthContext } from "./UseContext";

export const UseLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = UseAuthContext();

    const logout = async () => {
        setError(null);
        setIsPending(true);

        // sign user out
        try {
            await projectAuth.signOut();

            // dispatch LOGOUT
            dispatch({ type: "LOGOUT" });

            //if (!isCancelled) {
                setError(null);
                setIsPending(false);
            //}
        } catch (err) {
            //if (!isCancelled) {
                console.log(err.message);
                setError(err.message);
                setIsPending(false);
            //}
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { logout, error, isPending };
}