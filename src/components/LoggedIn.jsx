import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function LoggedIn({ element }) {
    const token = useSelector(state => state.auth.token);

    if (token) {
        return <Navigate to="/dashboard" replace />
    }
    return element;
}