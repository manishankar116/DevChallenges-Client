import React, { useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import Editor from './Editor';

const Delta = Quill.import('delta');

const TestEditor = () => {
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);

  const quillRef = useRef(null);

  const handleLogContent = () => {
    const quill = quillRef.current;

    if (!quill) {
      console.log('Editor not ready');
      return;
    }

    console.log('Plain text:', quill.getText().trim());
    console.log('HTML:', quill.root.innerHTML);
    console.log('Delta:', quill.getContents());
  };

  return (
    <div>
      <Editor
        ref={quillRef}
        readOnly={readOnly}
        defaultValue={new Delta()
          .insert('Hello')
          .insert('\n', { header: 1 })
          .insert('Some ')
          .insert('initial', { bold: true })
          .insert(' ')
          .insert('content', { underline: true })
          .insert('\n')}
        onSelectionChange={setRange}
        onTextChange={setLastChange}
      />

      <button onClick={handleLogContent}>Log text</button>
    </div>
  );
};

export default TestEditor;