import React, { useState, useEffect, useRef } from 'react';
import { compressToTargetSize, compressToQuality } from '../utils/compress';
import { formatBytes } from '../utils/fileUtils';
import ControlPanel from './ControlPanel';
import PreviewPane from './PreviewPane';
import ResultStats from './ResultStats';

const ImageCard = ({ file, onRemove, onCompressed }) => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [compressedUrl, setCompressedUrl] = useState('');
    const [isCompressing, setIsCompressing] = useState(false);
    const [mode, setMode] = useState('size'); // 'size' or 'quality'
    const [targetSize, setTargetSize] = useState(300); // 300 KB default
    const [quality, setQuality] = useState(80); // 80% default
    const [stats, setStats] = useState(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const url = URL.createObjectURL(file);
        setOriginalUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    const handleCompress = async () => {
        if (!originalUrl) return;
        setIsCompressing(true);

        try {
            const img = new Image();
            img.src = originalUrl;
            await img.decode();

            let result;
            if (mode === 'size') {
                result = await compressToTargetSize(img, targetSize * 1024);
            } else {
                result = await compressToQuality(img, quality / 100);
            }

            setCompressedUrl(result.dataUrl);
            setStats({
                originalSize: file.size,
                compressedSize: result.bytes,
                qualityUsed: result.quality || (quality / 100)
            });

            onCompressed(file.name, result.dataUrl);
        } catch (err) {
            console.error('Compression failed:', err);
        } finally {
            setIsCompressing(false);
        }
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        const extension = file.name.split('.').pop();
        const baseName = file.name.replace(`.${extension}`, '');
        link.download = `${baseName}-compressed.${extension}`;
        link.href = compressedUrl;
        link.click();
    };

    return (
        <div className="bg-white dark:bg-slate-800/40 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden flex flex-col md:flex-row h-full">
            {/* Visual Section */}
            <div className="p-6 md:w-1/2 flex flex-col gap-4 bg-slate-50/50 dark:bg-slate-900/20">
                <div className="flex justify-between items-center">
                    <div className="overflow-hidden">
                        <h4 className="font-bold text-slate-800 dark:text-slate-100 truncate max-w-[200px]">{file.name}</h4>
                        <p className="text-sm text-slate-400 font-medium">{formatBytes(file.size)}</p>
                    </div>
                    <button
                        onClick={onRemove}
                        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-full transition-all"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                <PreviewPane
                    originalUrl={originalUrl}
                    compressedUrl={compressedUrl || originalUrl}
                />

                {stats && (
                    <ResultStats
                        originalSize={stats.originalSize}
                        compressedSize={stats.compressedSize}
                        qualityUsed={stats.qualityUsed}
                    />
                )}
            </div>

            {/* Controls Section */}
            <div className="p-6 md:w-1/2 flex flex-col border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700/50">
                <div className="flex-1">
                    <ControlPanel
                        mode={mode}
                        setMode={setMode}
                        targetSize={targetSize}
                        setTargetSize={setTargetSize}
                        quality={quality}
                        setQuality={setQuality}
                        onCompress={handleCompress}
                        isCompressing={isCompressing}
                    />
                </div>

                {compressedUrl && (
                    <button
                        onClick={handleDownload}
                        className="mt-6 w-full py-4 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Compressed
                    </button>
                )}
            </div>
        </div>
    );
};

export default ImageCard;
