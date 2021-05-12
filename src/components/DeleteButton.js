import React, { useState } from 'react';
import { DELETE_COMMENT_MUTATION,DELETE_POST_MUTATION,FETCH_POSTS_QUERY } from '../util/graphql'
import { useMutation } from '@apollo/client';
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DeleteButton({ postId, commentId, callback, showDelete }) {
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrMutation] = useMutation(mutation, {
    async update(proxy) {
    if (!commentId) {
        const data = await proxy.readQuery({
            query: FETCH_POSTS_QUERY
        });
        if(data && data.getPosts){
            let newData = data.getPosts.filter((p) => p.id !== postId);
            proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: {
                ...data,
                getPosts: {
                newData,
                },
            }});
        }
        if (callback) callback();
    }
    },
    variables: {
      postId,
      commentId
    }
  });
  return (
    showDelete ?
    <div className="cursor-pointer flex flex-row" onClick={deletePostOrMutation}>
        <span className="text-red-500 mr-2">Delete</span>
        <span className="self-center mr-1">
            <FontAwesomeIcon icon={faTrashAlt} color="red"/>
        </span>
    </div>
    :null
  );
}

export default DeleteButton;
