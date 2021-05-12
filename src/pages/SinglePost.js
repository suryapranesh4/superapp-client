import React, { useContext, useState, useRef } from 'react';
import { SUBMIT_COMMENT_MUTATION, FETCH_POST_QUERY } from '../util/graphql';
import { useQuery, useMutation } from '@apollo/client';
import moment from 'moment';
import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import Loader from '../components/Loader';
import ReactTooltip from 'react-tooltip';
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SinglePost(props) {
    const postId = props.match.params.postId;
    const { user } = useContext(AuthContext);
    const commentInputRef = useRef(null);
    const [comment, setComment] = useState('');

    const { data, loading } = useQuery(FETCH_POST_QUERY, { variables: { postId } });
    let postData = (data && data.getPost) || [];

      const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update() {
          setComment('');
          commentInputRef.current.blur();
        },
        variables: {
          postId,
          body: comment
        }
      });

    function deletePostCallback() {
        props.history.push('/');
    }


        const { id,body,createdAt,username,comments,likes,likeCount,commentCount } = postData;

        return(
            loading ? <Loader/> :
            <div>
                <h1 className="text-2xl flex justify-center py-6">Superapp Chat and Comment</h1>
                <div className="w-auto flex flex-col shadow-2xl rounded-2xl p-4 mx-2 my-4 bg-white">
                    <div className="flex flex-row h-2/5 sm:flex-row">
                        <img 
                            src="https://media.istockphoto.com/vectors/simple-man-head-icon-set-vector-id1196083861?k=6&m=1196083861&s=612x612&w=0&h=wpQleBE2ewChSl3iT2CJAAXE3LKwS4EQuJPjLer2R1Q="
                            className="shadow rounded-2xl align-middle border-none h-12 w-12 lg:h-20 lg:w-20"
                        />
                        <div className="px-2 flex flex-col justify-evenly">
                            <p className="text-black font-semibold text-md lg:text-lg">{username}</p>
                            <span className="text-gray-500 font-sans italic text-sm lg:text-md">{moment(createdAt).fromNow()}</span>
                        </div>
                    </div>
                    <div className="font-sans text-lg py-3 leading-6">
                        <div className="text-gray-900">{body}</div>
                    </div>
                        
                    <div className="flex flex-col md:flex-row my-2">
                        <LikeButton user={user} post={{ id, likeCount, likes }} />
                        <div data-tip="Comment on post">
                            <ReactTooltip />
                            <div className="flex flex-row text-blue-500 mr-5">
                                <span className="mr-2">Comments</span>
                                <span className="self-center mr-1"><FontAwesomeIcon icon={faComment} /></span>
                                <div className="text-blue-500">{commentCount}</div>
                            </div>
                        </div>
                        {user && user.username === username && (
                            <DeleteButton postId={id} callback={deletePostCallback} showDelete={true}/>
                        )}
                    </div>
                </div>
                {
                    comments && comments.length > 0 && <h1 className="text-3xl flex justify-center pt-3 pb-1 text-green-500">Comments</h1>
                }

                {
                    comments && comments.length > 0 ?
                        <div className="my-3 shadow-xl rounded-2xl p-3 bg-indigo-50 ml-4 mr-2">
                            {
                                comments.map((comment) => {
                                    return(
                                        <div key={comment.id} className="bg-white shadow-xl rounded-2xl my-2 p-4">
                                            <div className="flex flex-row">
                                                <div className="flex flex-row">
                                                    <div className="text-black font-semibold text-md lg:text-lg mr-4">{comment.username}</div>
                                                    <div className="text-gray-500 font-sans italic text-sm self-center">{moment(comment.createdAt).fromNow()}</div>
                                                </div>
                                            </div>
                                            <div className="font-sans text-lg pt-1 pb-3 leading-6">
                                                <div className="text-gray-900">{comment.body}</div>
                                            </div>
                                            <div>
                                                {
                                                    user && user.username === comment.username && 
                                                        <DeleteButton postId={id} commentId={comment.id} showDelete={true}/>
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        :
                    <div className="py-5 text-green-500 font-serif flex justify-center text-sm lg:text-2xl">
                        Involve in this chat by adding a comment!
                    </div>
                }

                {
                    user && 
                        <div className="mt-2 mb-4">
                            <form onSubmit={submitComment} className="px-4">
                                <input
                                    type="text"
                                    placeholder="Add comment"
                                    name="comment"
                                    value={comment}
                                    onChange={(event) => setComment(event.target.value)}
                                    ref={commentInputRef}
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                />
                                    <button
                                        type="submit"
                                        disabled={comment.trim() === ''}
                                        className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-green-dark focus:outline-none my-1"
                                    >
                                        Submit
                                    </button>
                            </form>
                        </div>
                }
        </div>
    )
}

export default SinglePost;