
export interface User {
  username: string;
}

export interface GeneratedImage {
  id: string;
  prompt: string;
  imageData: string; // base64 encoded image
  aspectRatio: string;
  createdAt: string;
}
