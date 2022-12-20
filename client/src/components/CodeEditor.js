import React from 'react';
import '../styles/coderEditor.css';
import { useEffect, useState } from 'react';
import { caseList } from '../db';
import { useParams } from 'react-router-dom';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import javascript from 'highlight.js/lib/languages/javascript';

import { io } from 'socket.io-client';

export function CodeEditor() {
  hljs.registerLanguage('javascript', javascript);

  const caseName = useParams();
  const caseDetails = caseList.filter(item => item.link === caseName.case);
  const [value, setValue] = useState(caseDetails[0].content);
  const [socket, setSocket] = useState();

  // HANDLERS
  const handleChange = e => {
    setValue(e.target.value);
  };

  /// USE EFFECTS
  useEffect(() => {
    const s = io('http://localhost:3001');
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);
  useEffect(() => {
    if (socket == null) return;

    socket.emit('getCase', caseName);
    socket.on('loadCase', data => {
      setValue(data);
    });
  }, [caseName, socket]);

  useEffect(() => {
    if (socket == null) {
      return;
    }
    socket.emit('sendChanges', value, caseName);
    socket.on('getChanges', value => {
      setValue(value);
    });
  }, [value, socket, caseName]);

  useEffect(() => {
    hljs.highlightAll();
  });

  return (
    <div className='codeEditorContainer'>
      <h2 className='codeEditorTitle'>{caseDetails[0].title}</h2>
      <pre>
        <code className='javascript'>{value}</code>
      </pre>
      <textarea
        className='codeEditorTextArea'
        value={value}
        onChange={handleChange}></textarea>
    </div>
  );
}
