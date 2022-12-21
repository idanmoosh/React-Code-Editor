import React from 'react';
import '../styles/coderEditor.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import javascript from 'highlight.js/lib/languages/javascript';
import { backendURL } from '../config';

import { io } from 'socket.io-client';

export function CodeEditor() {
  hljs.registerLanguage('javascript', javascript);

  const caseName = useParams();
  const [value, setValue] = useState();
  const [socket, setSocket] = useState();

  // HANDLERS
  const handleChange = e => {
    setValue({ ...value, content: e.target.value });
  };

  /// USE EFFECTS
  useEffect(() => {
    const s = io(backendURL);
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.emit('getCase', caseName);
    socket.on('loadCase', data => {
      setValue(data);
    });
  }, [caseName, socket]);

  useEffect(() => {
    if (!socket) {
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

  if (!value) {
    return;
  }
  return (
    <div className='codeEditorContainer'>
      <h2 className='codeEditorTitle'>{value.title}</h2>
      <pre>
        <code className='javascript'>{value.content}</code>
      </pre>
      <textarea
        className='codeEditorTextArea'
        value={value.content}
        onChange={handleChange}></textarea>
    </div>
  );
}
