import { Box, ToggleButton, Tooltip, Paper } from "@mui/material";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Heading from "@tiptap/extension-heading";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

interface RichTextBoxProps {
  value: string;
  onChange: (val: string) => void;
}

const RichTextBox = ({ value, onChange }: RichTextBoxProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      BulletList,
      OrderedList,
      Heading,
      TextStyle,
      Color,
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  return (
    <Box>
      {/* Toolbar */}
      <Paper
        elevation={1}
        sx={{
          display: "flex",
          gap: 1,
          p: 1,
          mb: 1,
          borderRadius: 1,
          bgcolor: "background.default",
        }}
      >
        <Tooltip title="Bold">
          <ToggleButton
            value="bold"
            selected={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <FormatBoldIcon />
          </ToggleButton>
        </Tooltip>

        <Tooltip title="Italic">
          <ToggleButton
            value="italic"
            selected={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <FormatItalicIcon />
          </ToggleButton>
        </Tooltip>

        <Tooltip title="Bullet List">
          <ToggleButton
            value="bulletList"
            selected={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <FormatListBulletedIcon />
          </ToggleButton>
        </Tooltip>

        <Tooltip title="Numbered List">
          <ToggleButton
            value="orderedList"
            selected={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <FormatListNumberedIcon />
          </ToggleButton>
        </Tooltip>
      </Paper>

      {/* Editor */}
      <Paper
        elevation={1}
        sx={{
          borderRadius: 1,
          p: 2,
          minHeight: 200,
          "& .ProseMirror": {
            minHeight: 180,
            outline: "none",
            fontSize: 16,
            lineHeight: 1.5,
            "& p": {
              margin: "4px 0", // reduce space between paragraphs
            },
            "& ul, & ol": {
              margin: "4px 0", // reduce top/bottom margin
              paddingLeft: "20px", // keep indent for list items
            },
            "& li": {
              margin: "2px 0", // reduce space between list items
            },
            "&:focus": {
              outline: "none",
            },
          },
          "&:focus-within": {
            borderColor: "primary.main",
            boxShadow: 3,
          },
        }}
      >
        <EditorContent editor={editor} />
      </Paper>
    </Box>
  );
};

export default RichTextBox;
