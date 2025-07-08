interface ProfileAvatasrDisplayProp {
  avatarUrl: string;
  alt?: string;
}

export function ProfileAvatarDisplay({
  avatarUrl,
  alt = "User avatar",
}: ProfileAvatasrDisplayProp) {
  return (
    <div className="relative w-32 h-32">
      <img
        src={avatarUrl}
        alt={alt}
        className="w-full h-full rounded-full object-cover border-4 border-gray-300"
      />
    </div>
  );
}
