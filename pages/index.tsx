import * as React from 'react'
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { spawn, Worker, Thread } from 'threads'


export default function Home() {
  const worker = React.useRef()
  React.useEffect(() => {
    if(!worker.current){
      const load = async() => {
        worker.current = await spawn(
          new Worker(new URL("../worker/hello",import.meta.url))
          )
      }
      load()
    }
    return () => worker.current && Thread.terminate(worker.current)
  },[])
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main className={styles.main}>
        <h1 
          className={styles.title} 
          onClick={
            async () => {
              const hello = await worker.current?.hello?.()
              console.log(hello)
              }
            } >
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
        </a>
      </footer>
    </div>
  );
}
