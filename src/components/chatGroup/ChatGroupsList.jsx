import React from 'react';

export default function ChatGroupsList({ groups, onSelect, selectedId }) {
  return (
    <div className="chat-groups-list">
      <h3 className='mb1'>📚 Chat Groups</h3>
      <ul>
        {groups.map(group => (
          <li
            key={group.group_id}
            onClick={() => onSelect(group.group_id)}
            className={selectedId === group.group_id ? 'active' : ''}
          >
            {group.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
