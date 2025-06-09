import { Redirect } from "react-router";

export default function Public() {
    return <Redirect to="/login" />
}