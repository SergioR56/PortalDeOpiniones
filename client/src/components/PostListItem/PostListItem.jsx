//Importamos los prop-types.
import PropTypes from 'prop-types';
import { userPropTypes, postPropTypes } from '../../utils/customPropTypes';

//Importamos los componentes.
import PostHeader from './PostHeader/PostHeader';
import PostBody from './PostBody/PostBody';
import PostFooter from './PostFooter/PostFooter';

//Importamos los estilos
import './PostListItem.css';

const PostListItem = ({ authUser, post, likePostById, deletePostById }) => {
  return (
    <li className='post'>
      <PostHeader username={post.username} createdAt={post.createdAt} />
      <PostBody text={post.text} image={post.image} />
      <PostFooter
        authUser={authUser}
        postId={post.id}
        owner={post.owner}
        likes={post.likes}
        likedByMe={post.likedByMe}
        likePostById={likePostById}
        deletePostById={deletePostById}
      />
    </li>
  );
};

PostListItem.propTypes = {
  authUser: userPropTypes,
  post: postPropTypes,
  likePostById: PropTypes.func.isRequired,
  deletePostById: PropTypes.func.isRequired,
};

export default PostListItem;
