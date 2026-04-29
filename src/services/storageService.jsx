const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const uploadProductImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!response.ok) throw new Error("Error al subir imagen a Cloudinary");

  const data = await response.json();

  // Aplicar transformaciones de Cloudinary: recorte inteligente, calidad y formato automáticos
  const url = data.secure_url.replace(
    "/upload/",
    "/upload/c_fill,g_auto,w_600,h_400,q_auto,f_auto/"
  );
  return url;
};
