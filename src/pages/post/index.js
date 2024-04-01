
import {useRouter} from "next/router";
import MarkdownEditor from "@/pages/post/editor";
import {useRef, useState} from "react";
import Header from "@/pages/component/header";
import Toast from "@/pages/component/Toast";

export default function Index() {
  const router = useRouter()
  const articleRef = useRef(null)
  const [title, setTitle] = useState('')
  const [postFlag, setPostFlag] = useState(false)
  const postArticle = () => {
    const article = articleRef.current;
    const articleInfo = {
      id:parseInt(Math.random() * 10 ** 10),
      title:title,
      createTime:Date.now(),
      content:article.getContent(),
    }
    fetch('/api/addArticle',{
      method:'post',
      body:JSON.stringify(articleInfo)
    }).then(res => res.json())
      .then(data => {
        setPostFlag(true);
        setTimeout(() => setPostFlag(false), 2500);
        setTimeout(() => router.push('/'),3000);
      })
  }

  return (
    <div className="bg-white h-screen">
      {postFlag && <Toast/>}
      <Header isPostPage={true}/>
      <div className="grid max-w-3xl  px-4 pt-32 mx-auto gap-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">开始记录吧 ✏️️</h1>
        </div>
        <div className="space-y-8">
          <div className="space-y-2">
            <label className="form-label" htmlFor="title">
              标题
            </label>
            <input id="title"
                   className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                   placeholder="请输入你的标题" onChange={(e) => setTitle(e.target.value)} value={title}/>
          </div>
          <div className="space-y-2">
            <label className="form-label" htmlFor="content">
              文章内容
            </label>
            <MarkdownEditor ref={articleRef}/>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={postArticle}
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background bg-black text-white h-11 rounded-md px-8">
              发布
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

