import cookingLoader from "../assets/loader.json";
import Lottie from "react-lottie";

const Loader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: cookingLoader,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm">
            <div className="flex flex-col items-center">
                <Lottie
                    options={defaultOptions}
                    height={200}
                    width={200}
                    className="opacity-90"
                />
                <p className="m-4 text-lg text-white font-semibold animate-pulse text-center">
                    Please Wait! While we find best recipe for you...
                </p>
            </div>
        </div>
    );
};

export default Loader;
