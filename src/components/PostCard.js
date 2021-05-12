import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes }
}) {
  const { user } = useContext(AuthContext);

  return (
        <div className="flex justify-evenly flex-col overflow-scroll"> 
                <div className="flex flex-row h-2/5 sm:flex-row">
                    <Link to={`/posts/${id}`} className="w-14 flex">
                        <img 
                            src="https://media.istockphoto.com/vectors/simple-man-head-icon-set-vector-id1196083861?k=6&m=1196083861&s=612x612&w=0&h=wpQleBE2ewChSl3iT2CJAAXE3LKwS4EQuJPjLer2R1Q="
                            className="shadow rounded-2xl align-middle border-none h-12 w-full object-cover md:h-full md:w-12"
                        />
                    </Link>
                    <div className="px-2 flex flex-col justify-evenly">
                        <Link to={`/posts/${id}`} className="font-sans">
                            <div className="text-black font-semibold text-sm lg:text-lg">{username}</div>
                        </Link>
                        <span className="text-gray-500 font-sans italic text-md lg:text-xl">{moment(createdAt).fromNow(true)}</span>
                    </div>
                </div>
           
            <div className="font-sans text-lg py-3 leading-6">
                <div className="text-gray-900">{body}</div>
            </div>

            <div className="flex flex-col md:flex-row">
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <Link to={`/posts/${id}`} className="text-blue-500 mr-4">
                    <div className="flex flex-row">
                            <span className="mr-2">Comments</span>
                            <span className="self-center mr-1">
                                <FontAwesomeIcon icon={faComment} />
                            </span>
                            <div>{commentCount}</div>
                    </div>
                </Link>
                {user && user.username === username && <DeleteButton postId={id} showDelete={false}/>}
            </div>
        </div>
  );
}

export default PostCard;