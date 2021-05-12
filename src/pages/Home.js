import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import Loader from '../components/Loader/index';
import { FETCH_POSTS_QUERY } from '../util/graphql';
import { Link } from 'react-router-dom';

function Home() {
    const { user } = useContext(AuthContext);
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);
    let posts = (data && data.getPosts) || [];

    return (
        <div>
            {
                loading ? <Loader/> :
                <div className="px-2 pb-10">
                    {user && <PostForm />}
                    <h1 className="text-2xl flex justify-center py-5">Superapp chats</h1>
                    <div>
                        {
                            posts && posts.length > 0 ?
                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                    {
                                    posts.map((post) => (
                                            <Link 
                                                to={`/posts/${post.id}`} 
                                                className="bg-white shadow-2xl rounded-2xl p-2 p-3 flex align-baseline overflow-scroll cursor-pointer" 
                                                key={post.id}
                                            >
                                                <PostCard post={post}/>
                                            </Link>
                                        ))
                                    }
                                </div>
                            :
                            <div className="py-20 text-green-500 font-serif flex justify-center text-md lg:text-2xl">
                                Start Chatting in superapp by creating a post!
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    );
}

export default Home;