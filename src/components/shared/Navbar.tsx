import { MouseEvent, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import { CgMenu } from 'react-icons/cg'
import { BsSearch } from 'react-icons/bs'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { toast } from 'react-hot-toast'

import { addRippleEffect } from '../../utils/shared/addRippleEffect.util'
import { setTokenInLocalStorage } from '../../utils/others/token.util'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { toggleSidebar } from '../../redux/actionCreators'

const Navbar = () => {
  const { auth } = useAppSelector((state) => state)
  const dispatch = useAppDispatch()
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setTokenInLocalStorage({
        accessToken: tokenResponse.access_token,
        expiresIn: tokenResponse.expires_in * 1000,
      })
    },
    onError: (errorResponse) => {
      console.log(errorResponse)
      toast.error('Oops! something went wrong')
    },
    scope: 'https://www.googleapis.com/auth/youtube.force-ssl',
  })

  const handleLogin = (e: MouseEvent<HTMLElement>) => {
    addRippleEffect(e)
    login()
  }

  const handleToggleSidebar = (e: MouseEvent<HTMLElement>) => {
    addRippleEffect(e)
    dispatch(toggleSidebar())
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (keyword.trim().length === 0) return
    inputRef.current.blur()
    navigate(`/search?q=${keyword}`)
  }
  return (
    <nav className='bg h-[60px] px-3 md:px-8 flex justify-between items-center'>
      <div className='flex gap-4 items-center'>
        <button
          onClick={handleToggleSidebar}
          className='p-2 hover:hover-color rounded-full transition-all duration-300 relative overflow-hidden'
        >
          <CgMenu className='menuIcon' />
        </button>
        <Link to='/' className='hidden md:inline'>
          <div className='flex items-center gap-1'>
            <LazyLoadImage
              src='/images/youtube-logo.png'
              alt='youtube'
              placeholderSrc='/images/youtube-logo.png'
              height={30}
              width={30}
              effect='blur'
              style={{ marginTop: '4px' }}
            />

            <h3 className='heading-lg hidden xm:block'>Youtube</h3>
          </div>
        </Link>
      </div>
      <div className='w-3/6 sm:w-1/2 flex rounded-3xl'>
        <form onSubmit={handleSearch} className='w-full flex'>
          <input
            type='text'
            placeholder='Search'
            ref={inputRef}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className='bg para-lg font-normal border focus:border-1 focus:border-blue-400 px-4 rounded-l-3xl outline-none w-full'
          />
          <button
            type='submit'
            className='border iconBtn-bg hover:hover-color h-10 w-16 rounded-r-3xl transition-all duration-300 flex justify-center items-center'
          >
            <BsSearch className='h-5 w-5 text-primary dark:text-primary-dark' />
          </button>
        </form>
      </div>
      {auth?.user ? (
        <div className='flex items-center rounded-full overflow-hidden cursor-pointer'>
          <LazyLoadImage
            src={auth?.user.picture}
            placeholderSrc={auth?.user.picture}
            effect='blur'
            alt='profile'
            height={40}
            width={40}
          />
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className='flex gap-2 items-center font-sans py-1 px-3 rounded-3xl border-2 border-blue-400 text-blue-400 hover:bg-blue-100 hover:text-blue-600 hover:border-blue-100 font-medium transition-all duration-300 relative overflow-hidden'
        >
          <HiOutlineUserCircle className='h-7 w-7 hidden md:inline' />
          SIGN IN
        </button>
      )}
    </nav>
  )
}

export default Navbar
