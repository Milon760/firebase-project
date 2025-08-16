import React, { useContext } from 'react'
import Modal from './Modal';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { AuthContext } from '../context/AuthContext';



const Home = () => {

  const { userData, closeModal, modalType, setModalType, logOut } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">

      {userData ? (
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-700 mb-4"> Welcome, {userData.displayName}!</h1>
          <p className="text-gray-600 mb-4"> User ID : <span className="font-mono text-sm break-all">{userData.uid}</span></p>
          <p className="text-gray-600 mb-4"> User Email : <span className="font-mono text-sm break-all">{userData.email}</span></p>
          <button onClick={logOut} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-all duration-200"> Sign Out </button>
        </div>
      ) : (
        <div className=" flex flex-col justify-center items-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 text-center animate-bounce"> Welcome to my web site 🚀 </h1>
          <div className=' space-x-5'>
            <button onClick={() => setModalType('login')} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-200">
              Sign In
            </button>
            <button onClick={() => setModalType('signup')} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-all duration-200">
              Sign Up
            </button>
          </div>
        </div>
      )}

      <Modal show={modalType !== null} onClose={closeModal}>
        {modalType === 'login' ? <SignIn /> : <SignUp />}
      </Modal>
    </div>
  )
}

export default Home;
