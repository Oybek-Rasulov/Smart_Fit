import React, { useEffect, useState } from 'react';
import ChatGroupsList from './ChatGroupsList';
import GroupChat from './GroupChat';

export default function ChatContainer({ userId }) {
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  useEffect(() => {
    const loadGroups = async () => {
      const res = await fetch('https://smartfitbackend.onrender.com/api/chat-groups');
      const data = await res.json();
      setGroups(data);
    };
    loadGroups();
  }, []);

  return (
    <div className="chat-container">
      <div className="sidebar">
        <ChatGroupsList
          groups={groups}
          onSelect={setSelectedGroupId}
          selectedId={selectedGroupId}
        />
      </div>
      <div className="main-chat">
        {selectedGroupId ? (
          <GroupChat groupId={selectedGroupId} userId={userId} />
        ) : (
          <p className="placeholder">💬 Select a group to start chatting!</p>
        )}
      </div>
    </div>
  );
}
