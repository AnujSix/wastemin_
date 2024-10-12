document.getElementById('showImageButton').addEventListener('click', function() {
    if (uploadedImage) {
        document.getElementById('imagePreview').innerHTML = `<img src="${uploadedImage.src}" alt="Image Preview">`;
        document.getElementById('imageInfo').innerHTML = `
            <h2>Image Info:</h2>
            <p><strong>Name:</strong> ${uploadedImage.name}</p>
            <p><strong>Size:</strong> ${uploadedImage.size}</p>
            <p><strong>Type:</strong> ${uploadedImage.type}</p>
            <p><strong>Description:</strong> ${uploadedImage.description || 'N/A'}</p>
            <p><strong>Location:</strong> ${uploadedImage.location || 'N/A'}</p>
            <p><strong>Team Requirement:</strong> ${uploadedImage.team || 'N/A'}</p>
        `;

        // Show the preview and info
        document.getElementById('imagePreview').style.display = 'block';
        document.getElementById('imageInfo').style.display = 'block';
    } else {
        alert('Please upload an image first.');
    }
});