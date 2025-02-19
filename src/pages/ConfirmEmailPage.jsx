import { useSearchParams } from "react-router-dom";
import SubmitCode from "../features/auth/SubmitCode";


export default function ConfirmEmailPage() {
    const [params] = useSearchParams();
    const token = params.get("token");
    const email = params.get("email");
    console.log(token);
    console.log(email);
    
    
    return (
        <SubmitCode email={email} token={token} />
    )
}