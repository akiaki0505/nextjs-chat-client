import Image from "next/image";
import style from "./style/style.module.css";
import githubMark from "@/public/github-mark.png";

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col justify-between">

        <div className="flex flex-col h-screen">
            <header className="flex justify-between p-4 border-b items-center bg-white">
                <h1 className="font-semibold text-xl leading-tight">Clone</h1>
                <button className="py-1 px-4 border-2 border-green-800 rounded">SingIn</button>
            </header>
            <div className="flex-auto">
                <div className="flex justify-center mt-16">
                    <div class="w-2/5 border bg-white">
                        <div class="my-12 text-center">
                            <h2 className="text-4xl font-bold">SingIn</h2>
                            <p className="my-4">
                                <span className="font-semibold">MailAdress</span>と
                                <span className="font-semibold">Password</span>を入力してください。
                            </p>
                            <form>
                                <div class="mb-2">
                                    <input type="email" placeholder="MailAdress" class="text-xl w-3/5 p-3 border rounded"/>
                                </div>
                                <div class="mb-2">
                                    <input type="password" class="text-xl w-3/5 p-3 border rounded" placeholder="Password"/>
                                </div>
                                <button type="submit" class="text-xl w-3/5 bg-green-800 text-white py-2 rounded">Login</button>
                            </form>
                            <div className={style.sub_h}>
                                <span className={style.sub_s}>OR CONTINUE WITH</span>
                            </div>
                            <button type="button" class="w-3/5 mt-5 inline-flex items-center justify-center h-9 mr-3 px-3 text-xl font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            <Image width={30} height={30} src={githubMark} alt="githubMark" className="mr-3"/>
                            GitHub
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </main>
  );
}
