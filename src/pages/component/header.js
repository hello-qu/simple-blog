import {useRouter} from "next/router";

export default function Header({isPostPage}) {

  const router = useRouter()

  return (
    <header
      className="fixed w-full h-16 flex justify-between	 items-center px-24	 bg-white border-b-1  shadow-md">
      <span onClick={() => router.push('/')} className="text-2xl cursor-pointer">Simple Blog</span>
      {!isPostPage && <button onClick={() => router.push('/post')} className="border rounded px-6 py-2">新建</button>}
    </header>
  )
}
