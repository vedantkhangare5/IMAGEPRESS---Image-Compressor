import React, { useState, useEffect } from 'react';
import UploadZone from './components/UploadZone';
import ImageCard from './components/ImageCard';
import { generateZip } from './utils/zipExport';

function App() {
  const [files, setFiles] = useState([]);
  const [compressedFiles, setCompressedFiles] = useState({});
  const [isThemeDark, setIsThemeDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isThemeDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [isThemeDark]);

  const handleFilesUpload = (newFiles) => {
    // Add unique IDs to files for tracking
    const stagedFiles = newFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      data: file
    }));
    setFiles(prev => [...prev, ...stagedFiles]);
  };

  const handleRemoveFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    setCompressedFiles(prev => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleCompressed = (id, dataUrl) => {
    setCompressedFiles(prev => ({
      ...prev,
      [id]: {
        name: files.find(f => f.id === id).data.name,
        dataUrl
      }
    }));
  };

  const downloadAll = async () => {
    const list = Object.values(compressedFiles);
    if (list.length === 0) return;

    // Append -compressed to filenames in ZIP
    const filesToZip = list.map(f => {
      const ext = f.name.split('.').pop();
      const base = f.name.replace(`.${ext}`, '');
      return {
        ...f,
        name: `${base}-compressed.${ext}`
      };
    });

    await generateZip(filesToZip);
  };

  const compressedCount = Object.keys(compressedFiles).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 font-sans text-slate-900 dark:text-slate-100 pb-20">
      {/* Background Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              ImagePress
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Privacy-First Compression</p>
          </div>
        </div>

        <button
          onClick={() => setIsThemeDark(!isThemeDark)}
          className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:scale-110 active:scale-95 transition-all"
        >
          {isThemeDark ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </header>

      <main className="relative z-10 container mx-auto px-6 mt-12">
        {files.length === 0 ? (
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block p-4 mb-6 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-2xl border border-emerald-200 dark:border-emerald-800 font-medium text-sm animate-bounce">
              🔒 100% Client-Side. Your images never leave your browser.
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-800 dark:text-white mb-8 leading-tight tracking-tighter">
              Compress images <br />
              <span className="text-indigo-600 dark:text-indigo-400">without the network.</span>
            </h2>
            <UploadZone onFilesUpload={handleFilesUpload} />
          </div>
        ) : (
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-500">
                  Ready for compression
                </h2>
                <p className="text-slate-400 font-medium">{files.length} images staged</p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setFiles([])}
                  className="px-6 py-3 text-slate-500 dark:text-slate-400 font-bold hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-all"
                >
                  Clear All
                </button>
                <button
                  onClick={() => document.getElementById('file-upload-add').click()}
                  className="px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-indigo-600 dark:text-indigo-400 font-bold rounded-xl shadow-sm hover:scale-105 transition-all"
                >
                  Add More
                </button>
                <input
                  id="file-upload-add"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFilesUpload(Array.from(e.target.files))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {files.map((fileObj) => (
                <ImageCard
                  key={fileObj.id}
                  file={fileObj.data}
                  onRemove={() => handleRemoveFile(fileObj.id)}
                  onCompressed={(name, dataUrl) => handleCompressed(fileObj.id, dataUrl)}
                />
              ))}
            </div>

            {compressedCount > 0 && (
              <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                <button
                  onClick={downloadAll}
                  className="px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg rounded-full shadow-2xl shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-4 animate-in fade-in slide-in-from-bottom-5 duration-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download All {compressedCount} Images (.ZIP)
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Privacy Badge if files uploaded */}
      {files.length > 0 && (
        <div className="fixed bottom-6 right-6 opacity-30 hover:opacity-100 transition-opacity flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-tighter">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M2.166 4.9L10 1.55l7.834 3.35a1 1 0 01.666.936V10c0 5.176-3.413 9.489-8.167 10.635a1 1 0 01-.666 0C5.413 19.49 2 15.176 2 10V5.836a1 1 0 01.666-.936zM10 3.23L4 5.8v4.2c0 3.992 2.597 7.42 6 8.448 3.403-1.027 6-4.456 6-8.448V5.8l-6-2.57z" clipRule="evenodd" />
          </svg>
          Local Only
        </div>
      )}
    </div>
  );
}

export default App;
