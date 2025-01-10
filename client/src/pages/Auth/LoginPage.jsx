import React from 'react';
import LoginBG from '@/assets/login-bg.png';

const LoginPage = () => {
    return (
        <div
            className="relative h-screen w-screen bg-gradient-to-br from-amber-50 to-orange-100"
            style={{
                backgroundImage: `url(${LoginBG})`,
                backgroundSize: 'contain', // Ensures the entire image is visible
                backgroundPosition: 'center', // Center the image
                backgroundRepeat: 'no-repeat', // Prevent tiling
            }}
        >
        </div>
    );
};

export default LoginPage;
