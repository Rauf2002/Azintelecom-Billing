import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { UseAuthContext } from "./UseContext";

export const SignUpHook = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = UseAuthContext();

    const signup = async (email, password) => {
        setError(null);
        setIsPending(true);

        try {
            const res = await projectAuth.createUserWithEmailAndPassword(email, password);
            console.log(res.user);

            if (!res) {
                throw new Error("Could not sign up");
            }

            // dispatch LOGIN action
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

    return { signup, error, isPending };
}