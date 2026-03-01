import JSZip from 'jszip';
import { saveAs } from 'file-saver';

/**
 * Bundles multiple images into a ZIP folder and initiates download.
 * @param {Array<{name: string, dataUrl: string}>} files
 * @param {string} zipName
 */
export async function generateZip(files, zipName = 'compressed-images.zip') {
    const zip = new JSZip();

    files.forEach((file) => {
        const base64Data = file.dataUrl.split(',')[1];
        zip.file(file.name, base64Data, { base64: true });
    });

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, zipName);
}
