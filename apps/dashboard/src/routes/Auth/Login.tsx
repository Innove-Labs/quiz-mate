import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, loading, error, isLoggedIn, checkUser } = useAuthStore();

    const handleLogin = async () => {
        await login(email, password);
    };

    console.log("rendered login");

    useEffect(() => {
        checkUser();
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/dashboard");
        }
    }, [isLoggedIn]);

    return (
        <div className="w[100%] min-h-[100vh] bg-gray-200 flex justify-center items-center">
            <div className="w-[30vw] h-[60vh] bg-gray-100 p-8 rounded-lg shadow-md">
                <h2 className="text-black font-bold mb-15">Login</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="display:block w-[100%] m-auto h-10 mb-10 border-none focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="display:block w-[100%] m-auto h-10 mb-10 border-none focus:outline-none"
                    />
                <button onClick={handleLogin} disabled={loading} className="display:block w-[100%] m-auto h-10 bg-blue-500 rounded-md mt-10">
                    <span className="text-white">{loading ? "Logging in..." : "Login"}</span>
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </div>
    );
};