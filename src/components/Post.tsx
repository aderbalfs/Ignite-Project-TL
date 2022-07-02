import { Comments } from './Comments';
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import styles from './Post.module.css';
import { Avatar } from './Avatar';
import { FormEvent, ChangeEvent, useState, InvalidEvent } from 'react';

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

interface PostProps {
  author: Author;
  publishedAt: Date;
  content: Content[];
}

export function Post({ author, publishedAt, content }: PostProps){
  const [comments, setComments] = useState([
    'Post muito legal mano!'
])
  const [newCommentText, setNewCommentText] = useState('')

  const publishedDateFormatted = format(publishedAt, "d 'de' MMMM 'às' HH:mm'h'",{
    locale: ptBR,
  })
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true, 
  })

  function handleNewComment(event: FormEvent){
    event.preventDefault();

    setComments([... comments, newCommentText])
    setNewCommentText('');

  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  function deleteComment(commentToDelete: string){
    // imutabilidade -> as variavéis não sofrem mutação, nós criamos um novo valor (um novo espaço na memória).
    const CommentsWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete;
    })

    setComments(CommentsWithoutDeletedOne);
  }

  const isNewCommentEmpty = newCommentText.length === 0;

    return(
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                      <strong>{author.name}</strong>
                      <span>{author.role}</span>
                    </div>
                </div>
                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                 { publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
              {content.map(line => {
                if(line.type === 'paragraph') {
                  return <p key={line.content}>{line.content}</p>
                } else if (line.type === 'link'){
                  return <p key={line.content}><a href="">{line.content}</a></p>
                }
              })}
            </div>
            <form onSubmit={handleNewComment} className={styles.commentForms}>
              <strong>Deixe seu feedback</strong>

              <textarea
                name="comment"
                placeholder="Deixe um comentário"
                value={newCommentText}
                onInvalid={ handleNewCommentInvalid}
                onChange={handleNewCommentChange}
                required
              />

              <footer>
                <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
              </footer>
            </form>
            <div className={styles.commentList}>
              {comments.map(comment => {
                return (
                  <Comments 
                    key={comment} 
                    content={comment} 
                    onDeleteComment={deleteComment}
                  />
                )
              })}
            </div>
        </article>
    )
}