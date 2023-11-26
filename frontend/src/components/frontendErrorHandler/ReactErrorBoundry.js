import ErrorPage from "./ErrorPage";
import { ErrorBoundary } from "react-error-boundary";
import { api } from "../../apies/api";

export default function ReactErrorBoundary(props) {


    const handleError = async (error, errorInfo) => {
        console.log("ingo", errorInfo);
        console.log("error", error.message);
        error =  error.message

        await api.post('/error/frontend', { error, errorInfo });

    };


    return (
        <ErrorBoundary
            FallbackComponent={ErrorPage}
            onError={handleError}
            onReset={() => {
                // reloading the page to restore the initial state
                // of the current page
                console.log("reloading the page...");
                window.location.reload();

                // other reset logic...
            }}
        >
            {props.children}
        </ErrorBoundary>
    );
}