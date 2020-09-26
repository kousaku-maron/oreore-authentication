import React, { useState, useCallback } from 'react'
import Head from 'next/head'

const Home = () => {
  const [algorithm, setAlgorithm] = useState<string>('HS256')
  const [isVisibleAlgorismMenu, setIsVisibleAlgorismMenu] = useState<boolean>(false)
  const [imageBase64, setImageBase64] = useState<string | null>(null)
  const [previewImageBase64, setPreviewImageBase64] = useState<string | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [token, setToken] = useState<string>('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [message, setMessage] = useState<string>('')

  const onChangeFile = useCallback(async (file: File) => {
    if (file.size > 1000000) {
      return alert('ファイルサイズを1MB以下にして下さい。')
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (!reader.result) {
          return reject()
        }

        const result = reader.result as string
        setPreviewImageBase64(result)
        const base64 = result.replace(/^data:image\/\w+;base64,/, '')
        setImageBase64(base64)
        resolve(result)
      }

      reader.onerror = () => reject()
      reader.onabort = () => reject()
      reader.readAsDataURL(file)
    })
  }, [])

  const getToken = useCallback(async (base64: string, algorithm: string) => {
    if (algorithm !== 'OREORE') {
      return alert('アルゴリズムは"OREORE"以外使えません。')
    }

    // const data = { image: base64 }
    // const res = await fetch('/api/token', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // })
    // const json = await res.json()
    // setMessage(json.message)

    // if (json.success) {
    //   setToken(json.token)
    // }
  }, [])

  return (
    <div className="relative bg-black h-full">
      <Head>
        <title>OREORE AUTH</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="sticky top-0 z-50 bg-black w-full h-24 flex flex-col items-center border-b border-gray-800 border-solid">
        <div className="w-full max-w-screen-xl h-full flex flex-row items-center justify-between">
          <h2 className="text-2xl font-bold text-white">OREORE AUTH</h2>
          <a href="https://twitter.com/kousaku_maron" className="flex flex-row items-center">
            <p className="text-sm text-white">Created by </p>
            <img src="/twitter_logo.png" className="h-8" />
            <p className="text-sm text-white">@kousaku-maron</p>
          </a>
        </div>
      </nav>

      <main className="w-full flex flex-col items-center">
        <div className="w-full max-w-screen-xl flex flex-col items-center justify-center py-16">
          <div className="pb-12">
            <p className="text-xl font-bold text-white">
              OREORE AUTHは誰でも使える<span className="text-blue-600">オレオレな新しい認証メソッド</span>です。
            </p>
          </div>
          <div className="pb-12">
            <p className="text-xl font-bold text-white">OREORE AUTHが使える機会が増えれば、世界は良くなっていると言えます。</p>
          </div>
          <div>
            <button className="bg-purple-600 rounded p-6 text-base font-bold text-white">OREORE AUTHを学ぶ</button>
          </div>
        </div>

        <div className="w-full flex flex-col items-center bg-white">
          <div className="w-full max-w-screen-xl flex flex-col items-center justify-center py-12">
            <div className="pb-12">
              <p className="text-2xl font-bold text-black">使ってみる</p>
            </div>
            <div className="pb-12">
              <div className="bg-yellow-200 flex items-center justify-center rounded p-6 text-sm  text-black">
                <span className="font-bold mr-4">Warning:</span>
                OREORE AUTHにより取得できるトークンの管理に気をつけてください。トークンは特になんの意味も成さないただのランダムな文字列です。
              </div>
            </div>
            <div className="pb-12">
              <div className="flex flex-row items-center">
                <div className="mr-4">
                  <p className="text-sm font-bold text-black">アルゴリズム</p>
                </div>
                <div className="relative">
                  <div>
                    <button
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
                      id="options-menu"
                      aria-haspopup="true"
                      aria-expanded="true"
                      onClick={() => setIsVisibleAlgorismMenu((prev) => !prev)}
                    >
                      {algorithm}
                      <svg className="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Select - Options */}
                  {isVisibleAlgorismMenu && (
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg">
                      <div className="rounded-md bg-white shadow-xs">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          <p
                            className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                            role="menuitem"
                            onClick={() => {
                              setAlgorithm('HS256')
                              setIsVisibleAlgorismMenu(false)
                            }}
                          >
                            HS256
                          </p>
                          <p
                            className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                            role="menuitem"
                            onClick={() => {
                              setAlgorithm('HS384')
                              setIsVisibleAlgorismMenu(false)
                            }}
                          >
                            HS384
                          </p>
                          <p
                            className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                            role="menuitem"
                            onClick={() => {
                              setAlgorithm('HS512')
                              setIsVisibleAlgorismMenu(false)
                            }}
                          >
                            HS512
                          </p>
                          <p
                            className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                            role="menuitem"
                            onClick={() => {
                              setAlgorithm('OREORE')
                              setIsVisibleAlgorismMenu(false)
                            }}
                          >
                            OREORE
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full flex flex-row justify-between pb-6">
              <div className="w-1/2">
                <div className="w-full">
                  <label className="w-full">
                    {previewImageBase64 ? (
                      <div className="w-full flex items-center justify-center rounded">
                        <img src={previewImageBase64} className="w-full" />
                      </div>
                    ) : (
                      <div className="w-full h-64 flex items-center justify-center bg-gray-200 rounded">
                        <img src="/photo.png" className="w-10" />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      maxLength={1}
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        if (!e.target.files) return
                        onChangeFile(e.target.files[0])
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="w-8" />

              <div className="w-1/2">
                <div className="inline-flex w-full h-full rounded-md border border-gray-300 border-solid px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
                  <p className="break-all">{token}</p>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-row justify-between pb-12">
              <div className="w-1/2 flex flex-row items-center">
                <p className={`font-bold text-lg ${token ? 'text-green-500' : 'text-red-500'}`}>{message}</p>
              </div>

              <div className="w-8" />

              <div className="w-1/2">
                <button className="w-full bg-blue-500 rounded p-6 text-base font-bold text-white" onClick={() => getToken(imageBase64, algorithm)}>
                  トークン取得
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-black w-full h-24 flex flex-col items-center border-t border-gray-800 border-solid">
        <div className="w-full max-w-screen-xl h-full flex flex-row items-center justify-between">
          <a href="https://studio.gorori.jp" className="flex flex-row items-center">
            <p className="text-sm text-white">
              Supported by <span className="font-bold">Gorori Studio</span>
            </p>
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Home
