import React, { useContext, useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import Swal from 'sweetalert2'
import { AuthContext } from '../context/AuthContext'



const SignIn = () => {
    const [show, setShow] = useState(false);
    const { signInEmailAndPassword, signInGoogleHandle, setModalType, closeModal, setErrorMsg } = useContext(AuthContext);

    const formHandle = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const pass = e.target.pass.value;
        setErrorMsg(''); // Reset error message

        try {
            await signInEmailAndPassword(email, pass);
            Swal.fire({
                title: "Success",
                text: "Successfully Signed In ",
                icon: "success",
            });
            closeModal();
        } catch (error) {
            Swal.fire({
                title: "Failed",
                text: error.message,
                icon: "error",
            });
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInGoogleHandle();
            Swal.fire({
                title: " Success",
                text: " Successfully Signed In ",
                icon: "success"
            });
            closeModal();
        } catch (err) {
            Swal.fire({
                title: "Failed",
                text: err.message,
                icon: "error"
            });
        }
    };

    return (
        <div id='signin' className='flex justify-center items-center p-4'>
            <div className='w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-200 relative'>
                <h1 className='text-3xl text-center font-bold text-gray-700 mb-5'> Sign In </h1>
                <form onSubmit={formHandle} className='space-y-4'>
                    <div>
                        <label className='text-gray-600 block mb-1 font-medium' htmlFor="email"> Email : </label>
                        <input
                            type="email"
                            name="email"
                            id='email'
                            placeholder='example@gmail.com'
                            required
                            className='w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200'
                        />
                    </div>
                    <div className='relative'>
                        <label className='text-gray-600 block mb-1 font-medium' htmlFor="pass"> Password : </label>
                        <div className='flex items-center'>
                            <input
                                type={show ? 'text' : 'password'}
                                name="pass"
                                id='pass'
                                placeholder='********'
                                required
                                className='w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200'
                            />
                            {show ? <IoEyeOutline onClick={() => setShow(!show)} className='absolute right-3 cursor-pointer text-gray-500 hover:text-black' /> :
                                <IoEyeOffOutline onClick={() => setShow(!show)} className='absolute right-3 cursor-pointer text-gray-500 hover:text-black' />
                            }
                        </div>
                    </div>
                    <p className='text-right text-blue-600 hover:underline cursor-pointer'> Forgot Password? </p>
                    <button
                        type='submit'
                        className='bg-blue-600 w-full p-2 rounded-lg text-white font-medium text-lg hover:bg-blue-700 transition-all duration-200'>
                        Sign In
                    </button>

                    <div className='flex items-center justify-center space-x-3'>
                        <div className='flex-grow h-px bg-gray-300'></div>
                        <span className='text-gray-500'> OR </span>
                        <div className='flex-grow h-px bg-gray-300'></div>
                    </div>

                    <div>
                        <button onClick={signInWithGoogle} type="button" className='w-full border border-gray-400 shadow-sm font-medium rounded-lg flex justify-center items-center gap-2 px-5 py-2 cursor-pointer hover:bg-amber-50 transition-all duration-200'>
                            <FaGoogle /> Google
                        </button>
                    </div>
                </form>
                <p className='text-center text-gray-500 mt-5 font-serif'>
                    Don't have an account? <a onClick={() => setModalType('signup')} className='text-blue-600 font-medium px-2 hover:underline cursor-pointer'> Sign Up &rarr;</a>
                </p>
            </div>
        </div>
    );
};


export default SignIn;