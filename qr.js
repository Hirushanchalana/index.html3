document.addEventListener('DOMContentLoaded', (event) => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Check if the browser supports the getUserMedia API
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                video.srcObject = stream;
                video.play();
                requestAnimationFrame(scanQRCode);
            })
            .catch((error) => console.error('Error accessing camera:', error));
    } else {
        console.error('getUserMedia is not supported on your browser');
    }

    function scanQRCode() {
        // Draw the current frame from the video onto the canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Get the image data from the canvas
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Use jsQR library to decode QR code
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
            // QR code found
            console.log('QR Code Detected:', code.data);
        }

        // Continue scanning
        requestAnimationFrame(scanQRCode);
    }
});
