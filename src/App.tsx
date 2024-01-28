import { useState } from "react";
import "./App.css";

type Note = {
  id: number;
  title: string;
  content: string;
};

export default function App() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "note 1",
      content: "content 1",
    },
    {
      id: 2,
      title: "note 2",
      content: "content 2",
    },
    {
      id: 3,
      title: "note 3",
      content: "content 3",
    },
    {
      id: 4,
      title: "note 4",
      content: "content 4",
    },
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleAddNote = (event: React.FormEvent) => {
    event.preventDefault();

    const newNote: Note = {
      id: Date.now(),
      title: title,
      content: content,
    };

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  };

  return (
    <div className="app--container">
      <form className="note--form" onSubmit={(event) => handleAddNote(event)}>
        <input
          type="text"
          required
          placeholder="Title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <textarea
          placeholder="Content"
          rows={10}
          required
          value={content}
          onChange={(event) => setContent(event.target.value)}
        ></textarea>
        <button type="submit">Add Note</button>
      </form>
      <div className="notes--grid">
        {notes.map((note) => (
          <div
            className="note--item"
            key={note.id}
            onClick={() => handleNoteClick(note)}
          >
            <div className="notes--header">
              <button>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
