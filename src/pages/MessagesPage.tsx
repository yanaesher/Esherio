import { useState } from "react";
import { ChatList } from "../components/MessagePageComp/UserProfileChat";
import { Chat } from "../components/MessagePageComp/Chat"; // компонент чата

export function MessagesPage() {
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(
    null
  );

  return (
    <div className="main flex flex-col md:flex-row h-screen overflow-hidden">
      <aside className="md:w-1/4 border-r border-custom-black overflow-hidden bg-gray-200">
        <ChatList
          onSelectChat={setSelectedPartnerId}
          selectedPartnerId={selectedPartnerId}
        />
      </aside>
      <main className="w-full md:w-3/4 flex-1 pt-4 flex flex-col">
        {selectedPartnerId ? (
          <Chat partnerId={selectedPartnerId} />
        ) : (
          <p>Select the chat</p>
        )}
      </main>
    </div>
  );
}
