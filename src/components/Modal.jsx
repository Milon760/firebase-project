import React from 'react'

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg shadow-black p-6 md:p-10 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black text-3xl font-bold transition-transform transform hover:rotate-90"> &times; </button>
        {children}
      </div>
    </div>
  )
}

export default Modal;
