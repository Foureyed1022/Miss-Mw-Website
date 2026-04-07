import toast from 'react-hot-toast';

export const uploadImageToServer = async (file: File): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/news', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return data.url; // Returns the local server URL like "/uploads/filename.jpg"
  } catch (error) {
    console.error('Error uploading image:', error);
    toast.error('Failed to upload image');
    return null;
  }
};

export const deleteImageFromServer = async (imageUrl: string): Promise<boolean> => {
  try {
    const response = await fetch('/api/news', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};

export const validateImageFile = (file: File): boolean => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.type)) {
    toast.error('Please select a valid image file (JPEG, PNG, or WebP)');
    return false;
  }

  if (file.size > maxSize) {
    toast.error('Image size must be less than 5MB');
    return false;
  }

  return true;
};

export const getImageUrl = (path: string): string => {
  if (!path) return '';
  // Handle both absolute URLs and relative paths
  if (path.startsWith('http')) return path;
  // For local server files, construct the full URL
  return `${window.location.origin}${path}`;
};