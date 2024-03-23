import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

const TinyMCEEditor = ({ setState, initialValue }) => {
  const editorRef = useRef(null);
  const save = () => {
    if (editorRef.current) {
      console.log(
        "🚀 ~ file: TinyMCEEditor.jsx:8 ~ save ~ editorRef.current.getContent():",
        editorRef.current.getContent()
      );
      setState(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        onBlur={() => {
          save();
        }}
        apiKey="mayydsi9do5hj2911ivjbrqaazh2st5kcrghqvkz9o2danbo"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initialValue}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </>
  );
};

export default TinyMCEEditor;
