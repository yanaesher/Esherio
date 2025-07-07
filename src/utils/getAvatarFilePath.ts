export function generateAvatarFilePath(
  userId: string,
  fileName: string
): string {
  const timestamp = Date.now();
  const extension = fileName.split(".").pop(); 
  return `avatars/${userId}-${timestamp}.${extension}`;
}
