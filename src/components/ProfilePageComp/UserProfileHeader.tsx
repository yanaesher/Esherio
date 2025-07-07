// import { useEffect, useState } from "react";
// import { supabase } from "../../supabase-client";

// interface UserProfileHeaderProps {
//   userId: string;
// }

// export function UserProfileHeader({ userId }: UserProfileHeaderProps) {
//   const [avatarUrl, setAvatarUrl] = useState<string>("");
//   const [nickname, setNickname] = useState<string>("");
//   const [inputValue, setInputValue] = useState<string>("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);

//   useEffect(() => {
//     const loadProfile = async () => {
//       const { data, error } = await supabase
//         .from("profiles")
//         .select("nickname, avatar_url")
//         .eq("id", userId)
//         .single();

//       if (error) {
//         console.error("Ошибка загрузки профиля:", error);
//         return;
//       }

//       setNickname(data.nickname);
//       setInputValue(data.nickname);
//       setAvatarUrl(data.avatar_url);
//     };

//     loadProfile();
//   }, [userId]);

//   const handleNicknameSave = async () => {
//     setIsSaving(true);
//     const { error } = await supabase
//       .from("profiles")
//       .update({ nickname: inputValue })
//       .eq("id", userId);

//     if (error) {
//       console.error("Ошибка обновления имени:", error);
//     } else {
//       setNickname(inputValue);
//       setIsEditing(false);
//     }
//     setIsSaving(false);
//   };

//   const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setIsUploading(true);

//     const timestamp = Date.now();
//     const extension = file.name.split(".").pop();
//     const filePath = `${userId}-${timestamp}.${extension}`;

//     const { error: uploadError } = await supabase.storage
//       .from("avatars")
//       .upload(filePath, file);

//     if (uploadError) {
//       console.error("Ошибка загрузки файла:", uploadError);
//       setIsUploading(false);
//       return;
//     }

//     const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
//     const publicUrl = data.publicUrl;

//     const { error: updateError } = await supabase
//       .from("profiles")
//       .update({ avatar_url: publicUrl })
//       .eq("id", userId);

//     if (updateError) {
//       console.error("Ошибка сохранения URL в БД:", updateError);
//       setIsUploading(false);
//       return;
//     }

//     setAvatarUrl(publicUrl);
//     e.target.value = "";
//     setIsUploading(false);
//   };

//   return (
//     <div className="flex items-start gap-6 py-8">
//       <div className="relative">
//         <img
//           src={avatarUrl}
//           alt="Avatar"
//           className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleAvatarUpload}
//           className="absolute bottom-0 left-0 text-sm opacity-0 w-full h-full cursor-pointer"
//           title="Upload avatar"
//         />
//         {isUploading && (
//           <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-sm text-gray-600">
//             Uploading...
//           </div>
//         )}
//       </div>

//       <div className="flex flex-col justify-center gap-3">
//         {isEditing ? (
//           <input
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             className="text-2xl font-bold border px-2 py-1 rounded"
//           />
//         ) : (
//           <h2 className="text-2xl font-bold">{nickname}</h2>
//         )}

//         <button
//           onClick={isEditing ? handleNicknameSave : () => setIsEditing(true)}
//           className="px-6 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition"
//           disabled={isSaving}
//         >
//           {isSaving ? "Saving..." : isEditing ? "Save" : "Edit Profile"}
//         </button>
//       </div>
//     </div>
//   );
// }
