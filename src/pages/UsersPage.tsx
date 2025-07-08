import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProfiles } from "../services/getAllProfiles";
import { ProfileAvatarDisplay } from "../components/ProfilePageComp/ProfileAvatarDisplay";
import { Link } from "react-router-dom";
import type { UserProfile } from "../types/shared";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Popup } from "../components/Popup";

export function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<UserProfile[]>({
    queryFn: getAllProfiles,
    queryKey: ["allProfiles"],
  });

  const filteredUsers = users?.filter((user) =>
    user.nickname?.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  return (
    <main className="main">
      <div className="container pt-5 py-11">
        <h1 className="text-3xl font-bold mb-6 text-center text-primary">
          Search People
        </h1>

        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="
            w-full
            max-w-lg
            px-4 py-3
            mb-6
            border border-gray-300
            rounded-lg
            bg-white
            text-gray-900
            placeholder-gray-400
            focus:border-primary
            focus:ring-2 focus:ring-primary
            focus:outline-none
            transition duration-300 shadow-md
            mx-auto
            block
          "
        />

        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <LoadingSpinner />
          </div>
        )}

        {isError && (
          <Popup
            text="Failed to load users."
            className="text-center text-red-500"
          />
        )}

        <div className="space-y-4 max-w-lg mx-auto">
          {filteredUsers?.length === 0 && (
            <p className="text-center text-gray-500">No users found.</p>
          )}

          {filteredUsers?.map((user) => (
            <Link
              to={`/profile/${user.id}`}
              key={user.id}
              className="flex items-center gap-4 p-5 border-2 rounded-lg bg-white shadow-sm hover:bg-gray-300 transition"
            >
              <ProfileAvatarDisplay avatarUrl={user.avatar_url} />
              <span className="text-lg font-medium text-custom-black">
                {user.nickname || "Unnamed"}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
