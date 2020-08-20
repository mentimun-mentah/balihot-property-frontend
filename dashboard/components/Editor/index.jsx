import SunEditor from "suneditor-react";

const Editor = ({ setContent, height, initialValue }) => {
  const handleChange = content => {
    setContent(content)
  };
  return (
    <div>
      <SunEditor
        setContents={initialValue}
        onChange={handleChange}
        setOptions={{
          height: height,
          buttonList: [
            ["undo", "redo", "font", "fontSize", "formatBlock"],
            [ "bold", "underline", "italic", "strike", "subscript", "superscript", "removeFormat" ],
            [ "fontColor", "hiliteColor", "outdent", "indent", "align", "horizontalRule", "list", "table" ],
            ["link", "image"]
          ]
        }}
      />
    </div>
  );
};
export default Editor;
