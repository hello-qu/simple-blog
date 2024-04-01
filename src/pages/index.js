import Image from "next/image";
import Markdown from 'react-markdown';
import {useRouter} from "next/router";
import useSWR from "swr";
import Header from "@/pages/component/header";
import formatDate from '@/util/formatDate';


const fetcher = (url) => fetch(url).then((res) => res.json());



const content = (content) => {
  return content.length > 200 ?
    content.slice(0, 200) + '...'
    : content
}

export default function Home() {
  const router = useRouter()
  const {data = [], error, isLoading} = useSWR("/api/list", fetcher);
  const viewDetail = (id) => {
    router.push('/detail/' + id)
  }
  return (
    <div>
    <Header/>
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div className="mx-auto p-8 bg-white rounded-lg shadow">
        <div className="space-y-6">
          {data.map((item) => {
            return (<div className="cursor-pointer" key={item.id} onClick={() => viewDetail(item.id)}>
              <h2 className="text-2xl font-bold">{item.title}</h2>
              <article>
                <Markdown className="max-w-3xl mx-auto" components={{
                  // 处理预览时的空格换行问题 不显示图片
                  img:() => <span></span>,
                  p: ({children}) => <p style={{display: 'inline'}}>{children}</p>
                }}>
                  {content(item.content)}
                </Markdown>
              </article>
              <div className="flex items-center space-x-2 text-sm text-gray-500 mt-4">

                <ClockIcon/>
                <span>{formatDate(item.createTime)}</span>
                <TagIcon className="ml-4"/>
                <span>theme blog vuepress</span>
              </div>
            </div>)
          })}
        </div>
      </div>
    </main>
    </div>
  );
}


function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}


function TagIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/>
      <path d="M7 7h.01"/>
    </svg>
  )
}
