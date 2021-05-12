import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { useMutation } from '@apollo/client';
import { LIKE_POST_MUTATION } from '../util/graphql'
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidFaHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes && likes.find((like) => like.username === user.username)) 
        setLiked(true);
    else 
        setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id }
  });
  const likeButton = 
    user ? 
        liked ? 
            <button className="flex flex-row focus:outline-none"><span className="text-green-500 mr-2">Like</span><span className="self-center"><FontAwesomeIcon className="mr-1" icon={solidFaHeart} color="#10B981"/></span></button> 
        : 
            <button className="flex flex-row focus:outline-none"><span className="text-green-500 mr-2">Like</span><span className="self-center"><FontAwesomeIcon className="mr-1" icon={faHeart} color="#10B981"/></span></button>
    :
    <button className="flex flex-row focus:outline-none">
        <span className="mr-2 text-green-500">Like</span>
        <Link to="/login" className="self-center mr-1 text-green-600">
            <FontAwesomeIcon icon={faHeart}/>
        </Link>
    </button>
  ;

  return (
    <button className="flex flex-row mr-4">
        <div onClick={likePost}>
            <p data-tip={liked ? 'Unlike' : 'Like'}>{likeButton}</p>
            <ReactTooltip />
        </div>
        <div className="text-green-500">{likeCount}</div>
    </button>
  );
}

export default LikeButton;