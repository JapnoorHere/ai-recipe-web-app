import cookingLoader from "../assets/loader.json";
import Lottie from "react-lottie";
import { useState, useEffect } from "react";

const Loader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: cookingLoader,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const messages = [
        "Cooking up the perfect recipe for you...",
        "Blending ideas into a masterpiece just for you...",
        "Preparing a delicious idea tailored just for you...",
        "Hang tight! This might take 1-2 minutes to perfect..."
    ];
    
    const [currentMessage, setCurrentMessage] = useState(messages[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessage((prevMessage) => {
                const currentIndex = messages.indexOf(prevMessage);
                return messages[(currentIndex + 1) % messages.length];
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

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
                    {currentMessage}
                </p>
            </div>
        </div>
    );
};

export default Loader;
