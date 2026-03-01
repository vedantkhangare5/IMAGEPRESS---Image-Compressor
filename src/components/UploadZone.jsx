import React, { useState, useCallback } from 'react';

const UploadZone = ({ onFilesUpload }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
        if (files.length > 0) {
            onFilesUpload(files);
        }
    };

    const handleFileInput = (e) => {
        const files = Array.from(e.target.files).filter(file => file.type.startsWith('image/'));
        if (files.length > 0) {
            onFilesUpload(files);
        }
        // Reset input value so the same file can be uploaded again
        e.target.value = '';
    };

    return (
        <div
            className={`relative w-full max-w-2xl mx-auto p-12 mt-8 transition-all duration-300 border-2 border-dashed rounded-3xl group flex flex-col items-center justify-center cursor-pointer
        ${isDragging
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/20 shadow-2xl scale-[1.02]'
                    : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/30'
                }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload').click()}
        >
            <input
                id="file-upload"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileInput}
            />

            <div className="w-20 h-20 mb-6 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center transition-transform group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
            </div>

            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
                Drop images here
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-center text-lg">
                or <span className="text-indigo-600 dark:text-indigo-400 font-medium">browse files</span> from your device
            </p>

            <div className="mt-8 flex gap-4 text-xs font-medium text-slate-400 uppercase tracking-widest">
                <span>JPEG</span>
                <span>PNG</span>
                <span>WEBP</span>
            </div>

            {isDragging && (
                <div className="absolute inset-0 bg-indigo-600/10 pointer-events-none rounded-3xl animate-pulse" />
            )}
        </div>
    );
};

export default UploadZone;
