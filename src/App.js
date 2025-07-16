import React, { useState, useEffect } from 'react';
import { marked } from 'marked'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';
function App() {
  const [expanded, setExpanded] = useState({ editor: false, preview: false });
  
  const handleExpandToggle = (windowName) => {
    setExpanded(prev => ({
      ...prev, //...prev stands for spreading the previous state
      [windowName]: !prev[windowName] // Object spread where all keys/values of object will be flipped
      // if previously expanded.editor was false, calling with windowName = "editor" will set it to true (expand).
    }));
  };


  const [markdown, setMarkdown] = useState(`# Welcome to My Markdown Previewer!
## This is a sub-heading...
### And here's some other cool stuff:

Here's a [link](https://www.example.com).

\`Inline code\` is great for small code snippets.

\`\`\`
// This is a code block:
function example() {
  console.log("Hello, world!");
}
\`\`\`

- Here's a list item
  - With a nested item
    - And another nested item

> Blockquotes are handy for highlighting text.

![React Logo](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg)

**Bold text** is important sometimes!

Enjoy writing Markdown! 🎉`);

  useEffect(() => {
    marked.setOptions({
      breaks: true,
    });
  }, []);

  const handleChange = (event) => {
    setMarkdown(event.target.value);
  };

  return (
    <div className="Markdowntext">
      <div className={`window ${expanded.editor ? 'expanded' : ''}`}>
        <div className="window-header">
          <span className="window-title">Editor</span>
          <button className="expand-button"
          onClick={() => handleExpandToggle('editor')}
          aria-label={expanded.editor ? 'Collapse editor' : 'Expand editor'}>
            <FontAwesomeIcon icon={expanded.editor ? faCompress : faExpand} />
          </button>
        </div>
        <textarea
          id="editor"
          value={markdown}
          onChange={handleChange}
          placeholder="Type your markdown here..."
        ></textarea>
      </div>

      <div className={`window ${expanded.preview ? 'expanded' : ''}`}>
        <div className="window-header">
          <span className="window-title">Preview</span>
          <button className="expand-button" 
                  onClick={() => handleExpandToggle('preview')}
                  aria-label={expanded.preview ? 'Collapse preview' : 'Expand preview'}>
                    <FontAwesomeIcon icon={expanded.preview ? faCompress : faExpand} />
                  </button>
        </div>
        <div
          id="preview"
          dangerouslySetInnerHTML={{ __html: marked(markdown) }}
        ></div>
      </div>
    </div>
  );
}

export default App;
