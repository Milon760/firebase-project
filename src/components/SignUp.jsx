import React, { useContext, useState } from 'react'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import Swal from 'sweetalert2'
import { AuthContext } from '../context/AuthContext';
import { updateProfile } from 'firebase/auth';

const SignUp = () => {
    const [show, setShow] = useState(false);
    const [showConfram, setShowConfram] = useState(false);
    const { signUpEmailAndPass, setModalType, closeModal, setErrorMsg, errorMsg } = useContext(AuthContext);

    const formHandle = async (e) => {
        e.preventDefault();
        const name = e.target.fullName.value;
        const email = e.target.email.value;
        const pass = e.target.pass.value;
        const conframPass = e.target.conPass.value;
        const strongPwd = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()[\]{}\-_+~`|\\:;'",.<>/?])\S{6,}$/;

        setErrorMsg(''); // Reset error message

        if (pass !== conframPass) {
            setErrorMsg("Password do not match.")
            return;
        }

        if (!strongPwd.test(conframPass)) {
            setErrorMsg('password must have at least 6 cher. including uppercase, lowercase, number and special chearcter.')
            return;
        }

        try {
            const result = await signUpEmailAndPass(email, pass);
            const user = result.user;
            await updateProfile(user, { displayName: name });
            Swal.fire({
                title: "Success",
                text: "Successfully Sign In ",
                icon: "success",
            });
            closeModal();
        } catch (err) {
            console.error(err);
            setErrorMsg(err.message);
            Swal.fire({
                title: "failed",
                text: "Sign Up Failed",
                icon: "error",
            });
        }
    };

    return (
        <div id='signup' className='flex justify-center items-center p-4'>
            <div className='bg-white w-full p-8 rounded-2xl shadow-xl border border-gray-200 relative'>
                <h1 className='text-3xl text-center font-bold text-gray-500 mb-8'> Sign Up </h1>
                <form onSubmit={formHandle} className='space-y-4'>
                    <div className='my-3'>
                        <label htmlFor="fullName" className='block text-gray-600 mb-1 font-medium'> Full Name : </label>
                        <input type="text" name='fullName' id='fullName' placeholder='Name...' required className='w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200' />
                    </div>
                    <div className='my-3'>
                        <label htmlFor="email" className='block text-gray-600 mb-1 font-medium'> Email : </label>
                        <input type="email" name="email" id="email" placeholder='example@gmail.com' required className='w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200' />
                    </div>
                    <div className='my-3 relative'>
                        <label htmlFor="pass" className='block text-gray-600 mb-1 font-medium'> Password : </label>
                        <div className='flex items-center'>
                            <input type={show ? 'text' : 'password'} name='pass' id='pass' placeholder='********' required className='w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200' />
                            {show ? <IoEyeOutline onClick={() => setShow(!show)} className='absolute right-3 cursor-pointer text-gray-500 hover:text-black' /> :
                                <IoEyeOffOutline onClick={() => setShow(!show)} className='absolute right-3 cursor-pointer text-gray-500 hover:text-black' />
                            }
                        </div>
                    </div>
                    <div className='mt-3 mb-1 relative'>
                        <label htmlFor="conPass" className='block text-gray-600 mb-1 font-medium'> Confram Password : </label>
                        <div className='flex items-center'>
                            <input type={showConfram ? 'text' : 'password'} name='conPass' id='conPass' placeholder='********' required className='w-full py-2 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200' />
                            {showConfram ? <IoEyeOutline onClick={() => setShowConfram(!showConfram)} className='absolute right-3 cursor-pointer text-gray-500 hover:text-black' /> :
                                <IoEyeOffOutline onClick={() => setShowConfram(!showConfram)} className='absolute right-3 cursor-pointer text-gray-500 hover:text-black' />
                            }
                        </div>
                    </div>
                    <span className='text-red-500 text-sm'>{errorMsg}</span>
                    <div className='my-3'>
                        <input type="checkbox" id="check" required className='cursor-pointer accent-blue-600' />
                        <label htmlFor="check" className='ml-2 text-gray-600'> I agree to the Terme & Condition </label>
                    </div>
                    <button className='w-full bg-blue-600 rounded-lg font-medium py-2 text-white hover:bg-blue-700 transition-all duration-200'> Sign Up </button>
                </form>
                <p className='text-center text-gray-500 mt-5 font-serif'>
                    Alredy have an acount? <a onClick={() => setModalType('login')} className='text-blue-600 font-medium px-2 hover:underline cursor-pointer'> Sign In &rarr;</a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;