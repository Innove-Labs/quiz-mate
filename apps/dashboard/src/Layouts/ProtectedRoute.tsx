import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { useEffect } from "react";

const ProtectedRoute = () => {
    const user = useAuthStore((state) => state.user);
    const loading = useAuthStore((state) => state.loading);
    const checkUser = useAuthStore((state) => state.checkUser);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    console.log("rendered protected route", useAuthStore());

    useEffect(() => {
        if (!loading && !user) {
            checkUser();
        }

    }, [user, loading]);

    if (loading) {
        return <div>Loading...</div>
    } else if(loading === false) {
        return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
    } else {
        return <></>
    }
};

export default ProtectedRoute;