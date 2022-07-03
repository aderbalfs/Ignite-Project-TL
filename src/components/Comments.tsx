import { Trash, ThumbsUp } from 'phosphor-react';
import styles from './Comments.module.css';
import { Avatar } from './Avatar';
import { useState } from 'react'

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comments ({ content, onDeleteComment}: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);
  
  
  function handleDeleteComment() {
    onDeleteComment(content)
  } 

  function handleLikeComments(){
    setLikeCount((state) => {
      return state + 1
    });
  }

  return (
    <div className={styles.comment}>
      <Avatar 
        hasBorder={false} 
        src="https://github.com/luansgomes10.png" 
        alt=""
      />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Luan Gomes</strong>
              <time title="29 de junho às 13:24h"dateTime="2022-06-29 13:24:13 ">Cerca de 1h atrás </time>
            </div>
            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24}/>
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button onClick={handleLikeComments}>
            <ThumbsUp/>
            Gostar <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}