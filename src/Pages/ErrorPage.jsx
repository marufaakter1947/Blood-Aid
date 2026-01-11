// import Button from '../Component/Shared/Button/Button'
import { useNavigate } from 'react-router'
import errorImage from "../assets/images/error.jpeg";


const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <section className='bg-white '>
      <div className='container flex items-center min-h-screen px-6 py-12 mx-auto'>
        <img className="w-[400px] h-[345px] mt-5" src={errorImage} alt="" />
        <div className='flex flex-col items-center max-w-sm mx-auto text-center'>
          <p className='p-3 text-sm font-medium text-red-500 rounded-full bg-blue-50 '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
              />
            </svg>
          </p>
          <h1 className='mt-3 text-2xl font-semibold text-gray-800  md:text-3xl'>
            Something Went Wrong!
          </h1>
          <p className='mt-4 text-gray-500 '>Here are some helpful links:</p>

          <div className='flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto'>
            <button
              onClick={() => navigate(-1)}
              className='flex items-center justify-center w-1/2 px-5 py-2 text-white font-bold transition-colors duration-200 bg-linear-to-r from-[#BC1823] to-[#3f060a] border rounded-lg gap-x-2 sm:w-auto   hover:bg-red-400 cursor-pointer '
            >
              Go back
            </button>
            <button onClick={() => navigate('/')} className='px-5 py-2 bg-linear-to-r from-[#BC1823] to-[#3f060a] font-bold text-white rounded-lg hover:bg-red-400 cursor-pointer'>
              Take Me Home
            </button>

          </div>
        </div>
      </div>
    </section>
  )
}

export default ErrorPage
