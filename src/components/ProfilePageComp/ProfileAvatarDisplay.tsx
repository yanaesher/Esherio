interface ProfileAvatarDisplayProp {
  avatarUrl: string;
  alt?: string;
}

export function ProfileAvatarDisplay({
  avatarUrl,
  alt = "User avatar",
}: ProfileAvatarDisplayProp) {
  return (
    <div className="relative group w-26 sm:w-28 md:w-32 aspect-square">
      <img
        src={avatarUrl}
        alt={alt}
        className="w-full h-full rounded-full object-cover border-4 border-gray-300"
      />
    </div>
  );
}
