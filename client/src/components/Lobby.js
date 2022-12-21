import { useState, useEffect } from 'react';
import { ItemIcon } from './ItemIcon';
import '../styles/lobby.css';
import { backendURL } from '../config';

export function Lobby() {
  const [caseList, setCaseList] = useState([]);

  useEffect(() => {
    fetch(backendURL + 'cases')
      .then(res => res.json())
      .then(data => setCaseList(data));
  }, []);

  return (
    <div className='lobbyContainer'>
      <h2 className='lobbyHeader'>Choose code block</h2>
      {caseList.map(item => (
        <ItemIcon title={item.title} link={item.link} key={item.title} />
      ))}
    </div>
  );
}
