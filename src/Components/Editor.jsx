import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import axios from 'axios';

const Editor = forwardRef(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      ref.current?.enable(!readOnly);
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement('div')
      );

      const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
          const file = input.files[0];
          if (!file) return;

          const formData = new FormData();
          formData.append('image', file);

          try {
            const res = await axios.post('/api/upload-image', formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });

            const imageUrl =
              res?.data?.url ||
              res?.data?.imageUrl ||
              res?.data?.data?.url ||
              res?.data?.data?.imageUrl;

            if (!imageUrl) {
              throw new Error('Upload response did not include an image URL.');
            }

            const quill = ref.current;
            if (!quill) return;

            const range = quill.getSelection(true) || {
              index: quill.getLength(),
              length: 0,
            };

            quill.insertEmbed(range.index, 'image', imageUrl, 'user');
            quill.setSelection(range.index + 1, 'user');
            quill.focus();
          } catch (error) {
            console.error('Image upload failed:', error);
          }
        };
      };

      const quill = new Quill(editorContainer, {
        theme: 'snow',
        modules: {
          toolbar: {
            container: [
              [{ header: [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              ['link', 'image'],
            ],
            handlers: {
              image: imageHandler,
            },
          },
        },
      });

      ref.current = quill;

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        ref.current = null;
        container.innerHTML = '';
      };
    }, [ref]);

    return <div className="w-4xl" ref={containerRef}></div>;
  }
);

Editor.displayName = 'Editor';
export default Editor;