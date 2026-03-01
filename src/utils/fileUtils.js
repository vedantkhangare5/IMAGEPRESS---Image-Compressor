/**
 * Formats bytes into a human-readable string (KB, MB, GB, etc.)
 * @param {number} bytes
 * @param {number} decimals
 * @returns {string}
 */
export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Calculates the approximate byte size of a DataURL
 * @param {string} dataUrl
 * @returns {number}
 */
export const getByteSizeFromDataUrl = (dataUrl) => {
    if (!dataUrl) return 0;
    const base64Part = dataUrl.split(',')[1];
    if (!base64Part) return 0;
    // Base64 encoding uses 4 characters for every 3 bytes
    return Math.round(base64Part.length * 0.75);
};
