import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './postCard.scss';

export default function PostCard(props) {
    const {url, name, height, owner, ownerImage, likes, comments } = props;
    const likesCssClass = classNames('post-card__social likes', {
        'liked': likes > 0
    });

    return (
        <div className={`post-card`}>
            <figure className="post-card__body" style={{ height }}>
                {url && (
                    <img
                        className="post-card__img"
                        src={url}
                        alt={owner}
                    />
                )}
            </figure>
            <div className="post-card__footer">
                <p className="post-card__name" title={name}>{name}</p>
                <div className="post-card__data">                    
                    <a href="someurl.com" className="author" title={owner}>
                        <span className="avatar" style={{ backgroundImage: `url("${ownerImage}")` }}></span>
                        {owner}
                    </a>
                    <a href="someurl.com" className={likesCssClass}>
                        <svg width="12" height="10" viewBox="0 0 12 10" fillRule="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 0C7.927 0 6.67217 1.16493 6 1.91533C5.32783 1.16493 4.073 0 3 0C1.10067 0 0 1.41874 0 3.22441C0 6.22483 6 9.57667 6 9.57667C6 9.57667 12 6.22483 12 3.35183C12 1.54617 10.8993 0 9 0Z" />
                        </svg>
                        {likes}
                    </a>
                    <a href="someurl.com" className="post-card__social comments">
                        <svg width="11" height="11" viewBox="0 0 11 11" fillRule="none" xmlns="http://www.w3.org/2000/svg">
                            <path clipRule="evenodd" d="M2 0C0.895431 0 0 0.89543 0 2V5.44095V6.70551V10.7962L2.89961 8.70551H8.95582C10.0604 8.70551 10.9558 7.81008 10.9558 6.70551V2C10.9558 0.895431 10.0604 0 8.95582 0H2Z" />
                        </svg>
                        {comments}
                    </a>
                </div>                
            </div>
        </div>
    );
}

PostCard.propTypes = { 
    url: PropTypes.string,
    name: PropTypes.string,
    height: PropTypes.number,
    owner: PropTypes.string,
    ownerAvatar: PropTypes.string,
    likes: PropTypes.number,
    comments: PropTypes.number,
};
PostCard.defaultProps = { 
    url: '', 
    name: '',
    height: 0,
    owner: '', 
    ownerAvatar: '',
    likes: 0,
    comments: 0,
};
