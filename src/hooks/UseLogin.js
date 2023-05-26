import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { UseAuthContext } from "./UseContext";

export const UseLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = UseAuthContext();

    const login = async (email, password) => {
        setError(null);
        setIsPending(true);

        // sign user in
        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password);

            // dispatch LOGIN
            dispatch({ type: "LOGIN", payload: res.user });

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

    return { login, error, isPending };
}