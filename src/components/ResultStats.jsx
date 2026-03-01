import React from 'react';
import { formatBytes } from '../utils/fileUtils';

const ResultStats = ({ originalSize, compressedSize, qualityUsed }) => {
    const reduction = originalSize > 0
        ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
        : 0;

    const isPositive = originalSize > compressedSize;

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-800">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Compressed Size</p>
                <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{formatBytes(compressedSize)}</p>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-800">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Reduction</p>
                <p className={`text-xl font-bold ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {isPositive ? '-' : '+'}{Math.abs(reduction)}%
                </p>
            </div>
            <div className="col-span-2 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100/50 dark:border-indigo-800">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-xs font-medium text-indigo-400 uppercase tracking-wider mb-1">Quality Setting Used</p>
                        <p className="text-lg font-bold text-indigo-700 dark:text-indigo-300">{Math.round(qualityUsed * 100)}%</p>
                    </div>
                    <div className="h-10 w-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultStats;
