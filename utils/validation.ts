export const validateFileUpload = (file: File): { isValid: boolean; error?: string } => {
  // File type validation
  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
  
  if (file.type.startsWith('image/')) {
    if (!allowedImageTypes.includes(file.type)) {
      return { isValid: false, error: "Faqat JPEG, PNG, WebP va GIF formatlariga ruxsat berilgan" };
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB
      return { isValid: false, error: "Rasm hajmi 5MB dan oshmasligi kerak" };
    }
  } else if (file.type.startsWith('video/')) {
    if (!allowedVideoTypes.includes(file.type)) {
      return { isValid: false, error: "Faqat MP4, WebM va MOV formatlariga ruxsat berilgan" };
    }
    if (file.size > 50 * 1024 * 1024) { // 50MB
      return { isValid: false, error: "Video hajmi 50MB dan oshmasligi kerak" };
    }
  } else {
    return { isValid: false, error: "Noto'g'ri fayl turi" };
  }

  return { isValid: true };
};

export const validateBookReading = (title: string, pages: number): { isValid: boolean; error?: string } => {
  if (!title.trim()) {
    return { isValid: false, error: "Kitob sarlavhasi bo'sh bo'lishi mumkin emas" };
  }
  
  if (title.length > 200) {
    return { isValid: false, error: "Kitob sarlavhasi 200 belgidan oshmasligi kerak" };
  }
  
  if (pages <= 0 || pages > 10000) {
    return { isValid: false, error: "Sahifalar soni 1 dan 10000 gacha bo'lishi kerak" };
  }
  
  return { isValid: true };
};