import Markdown from 'react-markdown';
import Header from "@/pages/component/header";
import {useEffect, useState} from "react";
import formatDate from '@/util/formatDate'
import {router} from "next/client";


export default function Index() {
const [article, setArticle] = useState('');
  useEffect(() => {
    fetch('/api/article',{
      method:'post',
      body:JSON.stringify( {id:router.query.slug})
    }).then((res) => res.json())
      .then(data => {
        setArticle(data)
      });

  }, []);
  return (
    <div>
      <Header/>
      <div className=" h-screen px-4 pt-32 m-0   ">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight max-w-3xl mx-auto lg:text-4xl ">{article.title}</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">发表日期： {formatDate(article.createTime)}</p>
        </div>
        <article className="prose prose-gray dark:prose-invert max-w-3xl mx-auto">
          <Markdown>
            {article.content}
          </Markdown>
        </article>
      </div>
    </div>
  )
}

