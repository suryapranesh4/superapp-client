import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../util/graphql';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

function Login(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: '',
        password: ''
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_,{ data: { login: userData }}){
            context.login(userData);
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function loginUserCallback() {
        loginUser();
    }

    return (
        <div className="bg-grey-lighter flex flex-col">
            <form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 py-20">
                    <div className="bg-white px-6 py-8 border-2 border-grey-200 rounded text-black w-full">
                        <h1 className="mb-8 text-3xl text-center text-green-500">Log in</h1>
                        <input 
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="username"
                            placeholder="Username" 
                            onChange={onChange}
                        />
                        <input 
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password" 
                            onChange={onChange}
                        />
                        <button
                            type="submit"
                            className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
                        >
                            Log In
                        </button>
                    </div>
                    {
                        Object.keys(errors).length > 0 && 
                            <div className="border-2 border-red-500 rounded-sm text-white text-md my-20 w-full py-5">
                                <ul className="">
                                    {Object.values(errors).map((value) => <li className="text-red-500 text-md flex justify-center align-middle py-2" key={value}>{value}</li>)}
                                </ul>
                            </div>
                    }
                </div>
            </form>
        </div>
    );
}

export default Login;