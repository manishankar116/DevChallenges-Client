import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";

import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Unlink,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Highlighter,
  Undo2,
  Redo2,
  RemoveFormatting,
  Minus,
} from "lucide-react";

function ToolbarButton({
  onClick,
  active = false,
  disabled = false,
  title,
  children,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={[
        "flex h-8 w-8 items-center justify-center rounded-md transition",
        active
          ? "bg-slate-200 text-slate-900"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        disabled ? "cursor-not-allowed opacity-40" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="mx-1 h-6 w-px bg-slate-200" />;
}

export default function TextEditor({
  value = "",
  onChange,
  placeholder = "Describe the challenge and how you solved it...",
}) {
  const [activeTab, setActiveTab] = useState("write");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },

        // Link and Underline are already included
        // in StarterKit v3.
        link: {
          openOnClick: false,
          autolink: true,
          linkOnPaste: true,
          HTMLAttributes: {
            class: "text-blue-600 underline underline-offset-2",
          },
        },
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

      TextStyle,

      Color,

      Highlight.configure({
        multicolor: true,
      }),
    ],

    content: value || "",

    editorProps: {
      attributes: {
        class: "tiptap-editor"
      },
    },

    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
  });

  useEffect(() => {
    if (!editor) return;

    const currentHTML = editor.getHTML();

    if (value !== currentHTML) {
      editor.commands.setContent(value || "", {
        emitUpdate: false,
      });
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const previousUrl = editor.getAttributes("link").href;

    const url = window.prompt(
      "Enter URL",
      previousUrl || "https://"
    );

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .setLink({
        href: url,
      })
      .run();
  };

  const setTextColor = (event) => {
    const color = event.target.value;

    editor
      .chain()
      .focus()
      .setColor(color)
      .run();
  };

  const setHighlightColor = (event) => {
    const color = event.target.value;

    editor
      .chain()
      .focus()
      .toggleHighlight({
        color,
      })
      .run();
  };

  const clearFormatting = () => {
    editor
      .chain()
      .focus()
      .clearNodes()
      .unsetAllMarks()
      .run();
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* =========================
          WRITE / PREVIEW TABS
      ========================== */}
      <div className="flex border-b border-slate-200 px-4">
        <button
          type="button"
          onClick={() => setActiveTab("write")}
          className={[
            "border-b-2 px-4 py-3 text-sm font-medium transition",
            activeTab === "write"
              ? "border-slate-900 text-slate-900"
              : "border-transparent text-slate-500 hover:text-slate-900",
          ].join(" ")}
        >
          Write
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("preview")}
          className={[
            "border-b-2 px-4 py-3 text-sm font-medium transition",
            activeTab === "preview"
              ? "border-slate-900 text-slate-900"
              : "border-transparent text-slate-500 hover:text-slate-900",
          ].join(" ")}
        >
          Preview
        </button>
      </div>

      {activeTab === "write" ? (
        <>
          {/* =========================
              TOOLBAR
          ========================== */}
          <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 px-3 py-2">
            {/* Headings */}
            <ToolbarButton
              title="Heading 1"
              active={editor.isActive("heading", { level: 1 })}
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: 1 })
                  .run()
              }
            >
              <Heading1 size={17} />
            </ToolbarButton>

            <ToolbarButton
              title="Heading 2"
              active={editor.isActive("heading", { level: 2 })}
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: 2 })
                  .run()
              }
            >
              <Heading2 size={17} />
            </ToolbarButton>

            <ToolbarButton
              title="Heading 3"
              active={editor.isActive("heading", { level: 3 })}
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: 3 })
                  .run()
              }
            >
              <Heading3 size={17} />
            </ToolbarButton>

            <Divider />

            {/* Text formatting */}
            <ToolbarButton
              title="Bold"
              active={editor.isActive("bold")}
              onClick={() =>
                editor.chain().focus().toggleBold().run()
              }
            >
              <Bold size={17} />
            </ToolbarButton>

            <ToolbarButton
              title="Italic"
              active={editor.isActive("italic")}
              onClick={() =>
                editor.chain().focus().toggleItalic().run()
              }
            >
              <Italic size={17} />
            </ToolbarButton>

            <ToolbarButton
              title="Underline"
              active={editor.isActive("underline")}
              onClick={() =>
                editor.chain().focus().toggleUnderline().run()
              }
            >
              <Underline size={17} />
            </ToolbarButton>

            <ToolbarButton
              title="Strikethrough"
              active={editor.isActive("strike")}
              onClick={() =>
                editor.chain().focus().toggleStrike().run()
              }
            >
              <Strikethrough size={17} />
            </ToolbarButton>

            <Divider />

            {/* Code */}
            <ToolbarButton
              title="Inline Code"
              active={editor.isActive("code")}
              onClick={() =>
                editor.chain().focus().toggleCode().run()
              }
            >
              <Code size={17} />
            </ToolbarButton>

            <ToolbarButton
              title="Code Block"
              active={editor.isActive("codeBlock")}
              onClick={() =>
                editor.chain().focus().toggleCodeBlock().run()
              }
            >
              <Code2 size={17} />
            </ToolbarButton>

            <Divider />

            {/* Lists */}
            <ToolbarButton
              title="Bullet List"
              active={editor.isActive("bulletList")}
              onClick={() =>
                editor.chain().focus().toggleBulletList().run()
              }
            >
              <List size={17} />
            </ToolbarButton>

            <ToolbarButton
              title="Numbered List"
              active={editor.isActive("orderedList")}
              onClick={() =>
                editor.chain().focus().toggleOrderedList().run()
              }
            >
              <ListOrdered size={17} />
            </ToolbarButton>

            <ToolbarButton
              title="Blockquote"
              active={editor.isActive("blockquote")}
              onClick={() =>
                editor.chain().focus().toggleBlockquote().run()
              }
            >
              <Quote size={17} />
            </ToolbarButton>

            <Divider />

            {/* Alignment */}
            <ToolbarButton
              title="Align Left"
              active={editor.isActive({
                textAlign: "left",
              })}
              onClick={() =>
                editor.chain().focus().setTextAlign("left").run()
              }
            >
              <AlignLeft size={17} />
            </ToolbarButton>

            <ToolbarButton
              title="Align Center"
              active={editor.isActive({
                textAlign: "center",
              })}
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
            >
              <AlignCenter size={17} />
            </ToolbarButton>

            <ToolbarButton
              title="Align Right"
              active={editor.isActive({
                textAlign: "right",
              })}
              onClick={() =>
                editor.chain().focus().setTextAlign("right").run()
              }
            >
              <AlignRight size={17} />
            </ToolbarButton>

            <ToolbarButton
              title="Justify"
              active={editor.isActive({
                textAlign: "justify",
              })}
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
            >
              <AlignJustify size={17} />
            </ToolbarButton>

            <Divider />

            {/* Links */}
            <ToolbarButton
              title="Add Link"
              active={editor.isActive("link")}
              onClick={addLink}
            >
              <LinkIcon size={17} />
            </ToolbarButton>

            <ToolbarButton
              title="Remove Link"
              disabled={!editor.isActive("link")}
              onClick={() =>
                editor.chain().focus().unsetLink().run()
              }
            >
              <Unlink size={17} />
            </ToolbarButton>

            <Divider />

            {/* Text color */}
            <label
              title="Text Color"
              className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-slate-600 hover:bg-slate-100"
            >
              <span className="text-sm font-bold">A</span>

              <input
                type="color"
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                defaultValue="#000000"
                onChange={setTextColor}
              />
            </label>

            {/* Highlight */}
            <label
              title="Highlight"
              className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-slate-600 hover:bg-slate-100"
            >
              <Highlighter size={17} />

              <input
                type="color"
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                defaultValue="#fef08a"
                onChange={setHighlightColor}
              />
            </label>

            <Divider />

            {/* Horizontal rule */}
            <ToolbarButton
              title="Horizontal Rule"
              onClick={() =>
                editor.chain().focus().setHorizontalRule().run()
              }
            >
              <Minus size={17} />
            </ToolbarButton>

            {/* Clear formatting */}
            <ToolbarButton
              title="Clear Formatting"
              onClick={clearFormatting}
            >
              <RemoveFormatting size={17} />
            </ToolbarButton>

            <div className="flex-1" />

            {/* Undo / Redo */}
            <ToolbarButton
              title="Undo"
              disabled={!editor.can().undo()}
              onClick={() =>
                editor.chain().focus().undo().run()
              }
            >
              <Undo2 size={17} />
            </ToolbarButton>

            <ToolbarButton
              title="Redo"
              disabled={!editor.can().redo()}
              onClick={() =>
                editor.chain().focus().redo().run()
              }
            >
              <Redo2 size={17} />
            </ToolbarButton>
          </div>

          {/* =========================
              EDITOR
          ========================== */}
          <div className="relative">
            {!editor.getText().trim() && (
              <div className="pointer-events-none absolute left-5 top-4 z-10 text-sm text-slate-400">
                {placeholder}
              </div>
            )}

            <div
            className="
                min-h-[300px]
                px-5
                py-4
                outline-none

                [&_.tiptap-editor]:outline-none

                [&_.tiptap-editor_p]:mb-3
                [&_.tiptap-editor_p]:leading-7
                [&_.tiptap-editor_p]:text-slate-700

                [&_.tiptap-editor_h1]:mb-4
                [&_.tiptap-editor_h1]:mt-6
                [&_.tiptap-editor_h1]:text-3xl
                [&_.tiptap-editor_h1]:font-bold
                [&_.tiptap-editor_h1]:text-slate-900

                [&_.tiptap-editor_h2]:mb-3
                [&_.tiptap-editor_h2]:mt-5
                [&_.tiptap-editor_h2]:text-2xl
                [&_.tiptap-editor_h2]:font-semibold
                [&_.tiptap-editor_h2]:text-slate-900

                [&_.tiptap-editor_h3]:mb-2
                [&_.tiptap-editor_h3]:mt-4
                [&_.tiptap-editor_h3]:text-xl
                [&_.tiptap-editor_h3]:font-semibold
                [&_.tiptap-editor_h3]:text-slate-900

                [&_.tiptap-editor_ul]:mb-4
                [&_.tiptap-editor_ul]:ml-6
                [&_.tiptap-editor_ul]:list-disc
                [&_.tiptap-editor_ul]:space-y-1

                [&_.tiptap-editor_ol]:mb-4
                [&_.tiptap-editor_ol]:ml-6
                [&_.tiptap-editor_ol]:list-decimal
                [&_.tiptap-editor_ol]:space-y-1

                [&_.tiptap-editor_li]:text-slate-700
                [&_.tiptap-editor_li]:leading-7

                [&_.tiptap-editor_blockquote]:my-4
                [&_.tiptap-editor_blockquote]:border-l-4
                [&_.tiptap-editor_blockquote]:border-slate-300
                [&_.tiptap-editor_blockquote]:pl-4
                [&_.tiptap-editor_blockquote]:italic
                [&_.tiptap-editor_blockquote]:text-slate-600

                [&_.tiptap-editor_a]:text-blue-600
                [&_.tiptap-editor_a]:underline
                [&_.tiptap-editor_a]:underline-offset-2

                [&_.tiptap-editor_code]:rounded
                [&_.tiptap-editor_code]:bg-slate-100
                [&_.tiptap-editor_code]:px-1.5
                [&_.tiptap-editor_code]:py-0.5
                [&_.tiptap-editor_code]:font-mono
                [&_.tiptap-editor_code]:text-sm
                [&_.tiptap-editor_code]:text-slate-800

                [&_.tiptap-editor_pre]:my-4
                [&_.tiptap-editor_pre]:overflow-x-auto
                [&_.tiptap-editor_pre]:rounded-lg
                [&_.tiptap-editor_pre]:bg-slate-900
                [&_.tiptap-editor_pre]:p-4
                [&_.tiptap-editor_pre]:font-mono
                [&_.tiptap-editor_pre]:text-sm
                [&_.tiptap-editor_pre]:text-slate-100

                [&_.tiptap-editor_hr]:my-6
                [&_.tiptap-editor_hr]:border-slate-200

                [&_.tiptap-editor_strong]:font-bold
                [&_.tiptap-editor_em]:italic
                [&_.tiptap-editor_s]:line-through
            "
            >
                <EditorContent editor={editor} />
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 px-4 py-2 text-xs text-slate-400">
            Rich text editor
          </div>
        </>
      ) : (
        /* =========================
           PREVIEW
        ========================== */
        <div className="min-h-[300px] px-5 py-4">
          {editor.getText().trim() ? (
            <div
                className="
                    max-w-none

                    [&_p]:mb-3
                    [&_p]:leading-7
                    [&_p]:text-slate-700

                    [&_h1]:mb-4
                    [&_h1]:mt-6
                    [&_h1]:text-3xl
                    [&_h1]:font-bold
                    [&_h1]:text-slate-900

                    [&_h2]:mb-3
                    [&_h2]:mt-5
                    [&_h2]:text-2xl
                    [&_h2]:font-semibold
                    [&_h2]:text-slate-900

                    [&_h3]:mb-2
                    [&_h3]:mt-4
                    [&_h3]:text-xl
                    [&_h3]:font-semibold
                    [&_h3]:text-slate-900

                    [&_ul]:mb-4
                    [&_ul]:ml-6
                    [&_ul]:list-disc
                    [&_ul]:space-y-1

                    [&_ol]:mb-4
                    [&_ol]:ml-6
                    [&_ol]:list-decimal
                    [&_ol]:space-y-1

                    [&_li]:text-slate-700
                    [&_li]:leading-7

                    [&_blockquote]:my-4
                    [&_blockquote]:border-l-4
                    [&_blockquote]:border-slate-300
                    [&_blockquote]:pl-4
                    [&_blockquote]:italic
                    [&_blockquote]:text-slate-600

                    [&_a]:text-blue-600
                    [&_a]:underline

                    [&_code]:rounded
                    [&_code]:bg-slate-100
                    [&_code]:px-1.5
                    [&_code]:py-0.5
                    [&_code]:font-mono
                    [&_code]:text-sm

                    [&_pre]:my-4
                    [&_pre]:overflow-x-auto
                    [&_pre]:rounded-lg
                    [&_pre]:bg-slate-900
                    [&_pre]:p-4
                    [&_pre]:font-mono
                    [&_pre]:text-sm
                    [&_pre]:text-slate-100

                    [&_hr]:my-6
                    [&_hr]:border-slate-200

                    [&_strong]:font-bold
                    [&_em]:italic
                    [&_s]:line-through
                "
              dangerouslySetInnerHTML={{
                __html: editor.getHTML(),
              }}
            />
          ) : (
            <div className="flex min-h-[260px] items-center justify-center text-sm text-slate-400">
              Nothing to preview yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}