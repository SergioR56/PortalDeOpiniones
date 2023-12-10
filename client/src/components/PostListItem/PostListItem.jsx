//Importamos los prop-types.
import PropTypes from 'prop-types';
import { userPropTypes, postPropTypes } from '../../utils/customPropTypes';

//Importamos los componentes.
import PostHeader from './PostHeader/PostHeader';
import PostBody from './PostBody/PostBody';
import PostFooter from './PostFooter/PostFooter';

//Importamos los estilos
import './PostListItem.css';

const PostListItem = ({
  post,
}) => {
  return (
    <li className='post'>
      <PostHeader username={post.username} createdAt={post.createdAt} />
      <PostBody text={post.text} image={post.image} />
      <PostFooter
        postId={post.id}
        likes={post.likes}
        likedByMe={post.likedByMe}
      />
    </li>
  );
};

PostListItem.propTypes = {
  post: postPropTypes,
};

export default PostListItem;
