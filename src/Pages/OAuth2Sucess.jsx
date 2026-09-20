import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export default function OAuth2Success() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { login } = useAuthStore();

    useEffect(() => {
        const token = searchParams.get("token");
        const username = searchParams.get("username");

        if (!token || !username) {
            navigate("/login", { replace: true });
            return;
        }

        // Make Google login data look like normal login response
        const userData = {
            username: username,
            token: token
        };

        login(userData, token);

        navigate("/profile", { replace: true });

    }, [login, navigate, searchParams]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <p>Signing you in...</p>
        </div>
    );
}