import React from 'react';
import { ItemIcon } from './ItemIcon';
import '../styles/lobby.css';
import { caseList } from '../db';

export function Lobby() {
  fetch('/cases')
    .then(res => res.json())
    .then(data => console.log(data));
  return (
    <div className='lobbyContainer'>
      <h2 className='lobbyHeader'>Choose code block</h2>
      {caseList.map(item => (
        <ItemIcon title={item.title} link={item.link} key={item.title} />
      ))}
    </div>
  );
}
