//Importamos los hooks.
import { useAuth } from '../../hooks/useAuth';
import { usePosts } from '../../hooks/usePosts';

//Importamos los componentes.
import PostListItem from '../../components/PostListItem/PostListItem';
import PostSearchForm from '../../forms/PostSearchForm/PostSearchForm';

//Importamos los estilos
import './PostSearchPage.css';

const PostSearchPage = () => {
  const { authUser } = useAuth();
  const { posts, setSearchParams, likePostById, deletePostById, loading } =
    usePosts();

  return (
    <main>
      <PostSearchForm setSearchParams={setSearchParams} loading={loading} />
      <ul className='post-list'>
        {posts?.length > 0 ? (
          posts.map((post) => {
            return (
              <PostListItem
                key={post.id}
                authUser={authUser}
                post={post}
                likePostById={likePostById}
                deletePostById={deletePostById}
              />
            );
          })
        ) : (
          <li className='no-posts'>¡No se ha encontrado ningun post! 😥</li>
        )}
      </ul>
    </main>
  );
};

export default PostSearchPage;
