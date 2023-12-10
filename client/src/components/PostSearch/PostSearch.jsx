//Importamos los hooks.
import { usePosts } from '../../hooks/usePosts';

//Importamos los componentes.
import PostListItem from '../PostListItem/PostListItem';

//Importamos los estilos
import './PostSearch.css';

const PostSearch = () => {
  const { posts, loading } = usePosts();
  return (
    <main>
      <ul className='post-list'>
        {posts?.length > 0 ? (
          posts.map((post) => {
            return <PostListItem key={post.id} post={post} />;
          })
        ) : (
          <li className='no-posts'>
            ¡No se ha encontrado ningun post! 😥
          </li>
        )}
      </ul>
    </main>
  );
};

export default PostSearch;
