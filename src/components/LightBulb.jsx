import React from 'react';
import { HiOutlineLightBulb } from 'react-icons/hi';

const LightBulb = ({ isOn }) => {
    return (
        <div className="relative">
            {/* Background Glow Effect */}
            {isOn && (
                <div className="absolute inset-0 bg-yellow-400 blur-3xl opacity-30 rounded-full animate-pulse"></div>
            )}

            <HiOutlineLightBulb
                size={160}
                className={`relative z-10 transition-all duration-500 ${isOn
                        ? 'text-yellow-400 drop-shadow-[0_0_25px_rgba(250,204,21,0.8)]'
                        : 'text-slate-700'
                    }`}
            />
        </div>
    );
};

export default LightBulb;