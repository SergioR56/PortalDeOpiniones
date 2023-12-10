import PropTypes from 'prop-types';

import './PostFooter.css';

const PostFooter = ({ postId, likes, likedByMe }) => {
  return (
    <footer className='post-footer'>
      <div>
        <div className={`heart ${likedByMe && 'like'}`}></div>
        <p>{likes}</p>
      </div>
    </footer>
  );
};

PostFooter.propTypes = {
  postId: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
  likedByMe: PropTypes.bool.isRequired,
};

export default PostFooter;
