// import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />;
      <ToastContainer autoClose={1500} pauseOnFocusLoss={false} />
    </>
  );
}
