import { Header } from './components/Header'
import { Post } from './components/Post'
import { Sidebar } from './components/Sidebar'

import './global.css'
import styles from './App.module.css'
  

const posts = [
    {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/aderbalfs.png',
      name: 'Aderbal Ferreira',
      role: 'Web developer and gamer'
    },
    content: [
      {type: 'paragraph', content: 'Fala galeraa 👋'},
      {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      {type: 'link', content: 'jane.design/doctorcare'}
    ],
    publishedAt: new Date('2022-06-4 21:32:00')
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/gabriielpln.png',
      name: 'Gabriel Palhano',
      role: 'Back-end developer'
    },
    content: [
      {type: 'paragraph', content: 'Fala galeraa 👋'},
      {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      {type: 'link', content: 'jane.design/doctorcare'}
    ],
    publishedAt: new Date('2022-06-12 21:01:23')
  }, 
]
export function App() {
  return (
    <div>
      <Header/> 
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
             <Post
              key={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
              /> 
            ) 
          })}
        </main>
      </div>
    </div>
    )
    
}