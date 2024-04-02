// "use client";

// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";

// const TextEditor = () => {
//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: "<p>Hello World! 🌎️</p>",
//   });

//   return (
//     <EditorContent
//       className="rounded-[15px] h-[8rem] overflow-y-auto border-[1px] px-3 py-2 border-gray-400  text-[12px] text-neutral-900"
//       editor={editor}
//     />
//   );
// };

// export default TextEditor;

import { useRef, useState } from "react";
import { Textarea } from "./textarea";

const TextEditor = (
  errorValue?: string,
  onChangeFunction?: any,
  defaultValue?: string,
  placeholder?: string,
  name?: string
) => {
  const [text, setText] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault(); // Prevent the default behavior of the Enter key
      if (textAreaRef.current) {
        const start = textAreaRef.current.selectionStart;
        const end = textAreaRef.current.selectionEnd;
        const newText = text.substring(0, start) + "\n" + text.substring(end);
        setText(newText);
        textAreaRef.current.selectionStart = textAreaRef.current.selectionEnd =
          start + 1;
      }
    }
  };

  return (
    <Textarea
      className={`rounded-[15px] h-[8rem] border-[1px] px-3 py-2 border-gray-400  text-[12px] text-neutral-900 ${
        errorValue ? "error-border" : ""
      }`}
      value={defaultValue}
      placeholder={placeholder}
      style={{ resize: "none" }}
      name={name}
      onChange={onChangeFunction}
      onKeyDown={(e) => {
        e.key === "Enter" && e.preventDefault();
      }}
      maxLength={400}
    />
  );
};

export default TextEditor;
