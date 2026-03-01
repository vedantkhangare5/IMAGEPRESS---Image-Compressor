import React from 'react';

const ControlPanel = ({
    mode,
    setMode,
    targetSize,
    setTargetSize,
    quality,
    setQuality,
    onCompress,
    isCompressing
}) => {
    return (
        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex gap-2 p-1 bg-slate-200 dark:bg-slate-900 rounded-xl mb-6">
                <button
                    onClick={() => setMode('size')}
                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mode === 'size'
                            ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-md'
                            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                        }`}
                >
                    Target Size
                </button>
                <button
                    onClick={() => setMode('quality')}
                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mode === 'quality'
                            ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-md'
                            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                        }`}
                >
                    Quality Level
                </button>
            </div>

            {mode === 'size' ? (
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Target File Size (KB)
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={targetSize}
                            onChange={(e) => setTargetSize(Number(e.target.value))}
                            className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all pr-12 text-slate-800 dark:text-slate-100"
                            placeholder="e.g. 300"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">KB</span>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Quality Level
                        </label>
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold">{quality}%</span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="100"
                        value={quality}
                        onChange={(e) => setQuality(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 dark:bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                </div>
            )}

            <button
                onClick={onCompress}
                disabled={isCompressing}
                className="w-full mt-6 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all flex items-center justify-center gap-2 transform active:scale-[0.98]"
            >
                {isCompressing ? (
                    <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Compressing...
                    </>
                ) : (
                    'Compress Image'
                )}
            </button>
        </div>
    );
};

export default ControlPanel;
