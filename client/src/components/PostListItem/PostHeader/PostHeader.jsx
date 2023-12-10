//Importamos las prop-types.
import PropTypes from 'prop-types';

//Importamos los estilos.
import './PostHeader.css';

const PostHeader = ({ username, createdAt }) => {
    return (
        <header className="post-header">
            <p>@{username}</p>
            <time>
                {new Date(createdAt).toLocaleDateString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                })}
            </time>
        </header>
    );
};

PostHeader.propTypes = {
    username: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
};

export default PostHeader;
