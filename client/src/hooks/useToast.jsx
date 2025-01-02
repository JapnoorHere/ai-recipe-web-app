import { toast } from 'react-toastify';

export const useToast = () => {
    const showToast = (message, type) => {
        toast(message, {
            type: type,
            autoClose: 3000, 
            newestOnTop: true, 
            position: "top-center",
            
        });
    };

    return {
        showToast,
    };
};
