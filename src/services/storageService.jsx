import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadProductImage = async (file, productName) => {
  const sanitized = productName.trim().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
  const ext = file.name.split('.').pop();
  const path = `products/${sanitized}_${Date.now()}.${ext}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};
