import {forwardRef, useImperativeHandle, useState} from "react";
import Markdown from 'react-markdown';


const MarkdownEditor = forwardRef((props, ref) => {
  const [isPreview, setPreview] = useState(false);
  const [content, setContent] = useState("");


  useImperativeHandle(ref, () => {
    return {
      getContent() {
        return content
      }
    }
  })
  return (
    <div className="relative">
      {
        isPreview ? <Markdown
            className="prose w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[350px] max-h-[650px] overflow-scroll resize-none">
            {content}
          </Markdown> :
          <textarea value={content}
                    onChange={e => setContent(e.target.value)}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[350px] max-h-[650px]  overflow-scrollresize-none"
                    id="content" placeholder="请输入文章的内容"></textarea>
      }
      <button onClick={() => {
        setPreview(!isPreview)
      }}
              className="absolute right-0 bottom-0 bottom-2 right-2 inline-flex items-center justify-center whitespace-nowrap text-xs  bg-black text-white h-8 rounded-md px-6"> {isPreview ? "编辑" : "预览"}
      </button>
    </div>

  )
})


export default MarkdownEditor
