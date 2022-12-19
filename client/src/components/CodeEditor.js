import React from 'react';
import '../styles/coderEditor.css';
import { useEffect, useState } from 'react';
import { caseList } from '../db';
import { useParams } from 'react-router-dom';

import { io } from 'socket.io-client';

export function CodeEditor() {
  const caseName = useParams();
  const caseDetails = caseList.filter(item => item.link === caseName.case);
  const [value, setValue] = useState(caseDetails[0].content);
  const [socket, setSocket] = useState();

  function handleChange(event) {
    setValue(event.target.value);
  }

  useEffect(() => {
    const s = io('http://localhost:3001');
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  return (
    <div className='codeEditorContainer'>
      <h2 className='codeEditorTitle'>{caseDetails[0].title}</h2>
      <textarea
        className='codeEditorTextArea'
        value={value}
        onChange={handleChange}></textarea>
    </div>
  );
}
