import { getByteSizeFromDataUrl } from './fileUtils';

/**
 * Compresses an image element to a target file size using binary search.
 * @param {HTMLImageElement} imageElement
 * @param {number} targetBytes
 * @param {string} format 'image/jpeg' or 'image/webp'
 * @returns {Promise<{dataUrl: string, quality: number, bytes: number}>}
 */
export async function compressToTargetSize(imageElement, targetBytes, format = 'image/jpeg') {
    const canvas = document.createElement('canvas');
    canvas.width = imageElement.naturalWidth;
    canvas.height = imageElement.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imageElement, 0, 0);

    let low = 0.01;
    let high = 1.0;
    let best = null;

    // Max 20 iterations for binary search-like precision
    for (let i = 0; i < 20; i++) {
        const mid = (low + high) / 2;
        const dataUrl = canvas.toDataURL(format, mid);
        const bytes = getByteSizeFromDataUrl(dataUrl);

        // If within 10% of target, we consider it a success
        if (Math.abs(bytes - targetBytes) / targetBytes < 0.1) {
            best = { dataUrl, quality: mid, bytes };
            break;
        }

        if (bytes > targetBytes) {
            high = mid;
        } else {
            low = mid;
        }

        // Track best effort in case we don't hit the 10% threshold
        if (!best || Math.abs(bytes - targetBytes) < Math.abs(best.bytes - targetBytes)) {
            best = { dataUrl, quality: mid, bytes };
        }

        // Stop if we are making very small adjustments
        if (high - low < 0.001) break;
    }

    return best;
}

/**
 * Compresses an image element to a fixed quality level.
 * @param {HTMLImageElement} imageElement
 * @param {number} quality (0-1)
 * @param {string} format 'image/jpeg' or 'image/webp'
 * @returns {Promise<{dataUrl: string, bytes: number}>}
 */
export async function compressToQuality(imageElement, quality, format = 'image/jpeg') {
    const canvas = document.createElement('canvas');
    canvas.width = imageElement.naturalWidth;
    canvas.height = imageElement.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imageElement, 0, 0);

    const dataUrl = canvas.toDataURL(format, quality);
    const bytes = getByteSizeFromDataUrl(dataUrl);

    return { dataUrl, bytes };
}
