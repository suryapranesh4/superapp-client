import React from 'react';
import { CREATE_POST_MUTATION } from '../util/graphql'
import { useMutation } from '@apollo/client';

import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: ''
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            let newData = [result.data.createPost, ...data.getPosts];
            proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: {
                ...data,
                getPosts: {
                  newData,
                },
              } });
            values.body = '';
        }
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <div>
        <h1 className="text-xl flex justify-center py-5">Add your chat</h1>
        <form onSubmit={onSubmit}>
            <div>
            <input
                placeholder="Add a chat message.."
                name="body"
                onChange={onChange}
                value={values.body}
                error={error ? true : false}
                className="block border border-grey-light w-full p-3 rounded mb-4"
            />
                <button
                    type="submit"
                    className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-green-dark focus:outline-none my-1"
                >
                    Submit
                </button>
            </div>
        </form>
        {
            error && error.graphQLErrors && error.graphQLErrors[0] && error.graphQLErrors[0].message &&
            <div className="border-2 border-red-500 rounded-sm text-white text-md my-20 w-full py-5">
                <ul>
                    <li className="text-red-500 text-md flex justify-center align-middle py-2">{error.graphQLErrors[0].message}</li>
                </ul>
            </div>
        }
    </div>
  );
}

export default PostForm;