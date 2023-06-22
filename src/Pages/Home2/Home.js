import React from 'react'

const Home = () => {
  return (
    <div className='flex justify-center p-2 pt-20 items-center'>
      <div className="flex flex-col items-center my-0 mx-auto max-w-[480px] py-16 px-8 container">
      <h1 className="text-white text-5xl mb-8 pb-2 transition-colors ease-in-out duration-[0.4s] font-permanentMaker border-b-[2px] border-b-green hover:text-green">
        Todo App
      </h1>
      <div  className="flex flex-col">
        <input type='text'
          className="w-full h-12 px-4 py-1 rounded-md border border-gray-100 text-gray-800 focus:outline-none"
          placeholder="What is in your mind?"
        />
        <button
          className="w-full h-8 px-4 py-1 rounded-md my-3 bg-green text-white hover:bg-opacity-90"
          type="submit"
        >
          Add
        </button>
      </div>
    </div>
    </div>
  )
}

export default Home 