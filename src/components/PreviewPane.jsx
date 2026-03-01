import React, { useState } from 'react';

const PreviewPane = ({ originalUrl, compressedUrl }) => {
    const [showOriginal, setShowOriginal] = useState(false);

    return (
        <div className="group relative w-full aspect-square bg-slate-100 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <img
                src={showOriginal ? originalUrl : compressedUrl}
                alt="Preview"
                className="w-full h-full object-contain transition-opacity duration-300"
            />

            <div className="absolute top-4 left-4 bg-slate-900/70 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
                {showOriginal ? 'Original' : 'Compressed'}
            </div>

            <button
                onMouseEnter={() => setShowOriginal(true)}
                onMouseLeave={() => setShowOriginal(false)}
                className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md text-slate-800 dark:text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-95"
                title="Hold to see original"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            </button>

            <div className="absolute inset-x-0 bottom-0 py-2 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-center text-[10px] text-white/80 font-medium">Hover icon to see original</p>
            </div>
        </div>
    );
};

export default PreviewPane;
