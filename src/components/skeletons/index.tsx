import { LazyLoadImage } from 'react-lazy-load-image-component'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { useAppSelector } from '../../hooks/redux-hooks'

export const CustomSkeletonTheme = ({ children }: { children: React.ReactNode }) => {
  const { mode } = useAppSelector((state) => state.theme)

  return (
    <SkeletonTheme
      baseColor={mode === 'dark' ? '#525252' : '#E7E5E4'}
      highlightColor={mode === 'dark' ? '#737373' : '#0000000d'}
    >
      {children}
    </SkeletonTheme>
  )
}

export const VideoCardSkeleton = () => {
  return (
    <div>
      <CustomSkeletonTheme>
        <div className='leading-none relative rounded-xl overflow-hidden mb-2'>
          <div className='absolute top-0 left-0 w-full h-full'>
            <Skeleton className='h-full' />
          </div>
          <LazyLoadImage
            src='/images/placeholder.jpg'
            placeholderSrc='/images/placeholder.jpg'
            effect='blur'
            width={'100%'}
            style={{ visibility: 'hidden', position: 'relative', zIndex: 0 }}
          />
        </div>
        <div className='flex gap-3 pt-3'>
          <div className='leading-none w-9'>
            <Skeleton className='h-9' circle />
          </div>
          <div className='w-[calc(100%-48px)]'>
            <h4 className='leading-none w-full mb-2'>
              <Skeleton className='h-5' />
            </h4>
            <p className='leading-none w-1/2'>
              <Skeleton className='h-5' />
            </p>
          </div>
        </div>
      </CustomSkeletonTheme>
    </div>
  )
}

export const CategorySkeleton = () => {
  const width = Math.floor(Math.random() * (230 - 100 + 1)) + 100
  return (
    <CustomSkeletonTheme>
      <div style={{ width: width + 'px' }} className='leading-none h-8 rounded-lg overflow-hidden'>
        <Skeleton className='h-full' />
      </div>
    </CustomSkeletonTheme>
  )
}

export const ChannelCardSkeleton = () => {
  return (
    <CustomSkeletonTheme>
      <div className='flex items-center w-full'>
        <div className='flex-1 basis-[1e-9px] mr-4 max-w-30 min-w-24 md-2:max-w-40 md-2:min-w-36 xm:max-w-[360px] xm:min-w-60'>
          <div className='flex justify-center items-center flex-none md-2:w-36 xm:w-60 relative rounded-full overflow-hidden mx-auto'>
            <div className='leading-none h-[80px] w-[80px] md-2:h-[136px] md-2:w-[136px] rounded-full overflow-hidden'>
              <Skeleton className='h-full' circle />
            </div>
          </div>
        </div>
        <div className='max-w-[calc(100%-120px)] min-w-[calc(100%-96px)] md-2:max-w-[calc(100%-160px)] md-2:min-w-[calc(100%-144px)] xm:max-w-[calc(100%-376px)] xm:min-w-[calc(100%-256px)]'>
          <div>
            <div className='leading-none w-1/4 mb-4'>
              <Skeleton className='h-6' />
            </div>
            <div className='leading-none w-1/2 mb-1'>
              <Skeleton className='h-3' />
            </div>
            <div className='leading-none w-3/4 mb-2'>
              <Skeleton className='h-3' />
            </div>
          </div>
        </div>
      </div>
    </CustomSkeletonTheme>
  )
}

export const SearchedVideoCardSkeleton = () => {
  return (
    <CustomSkeletonTheme>
      <div className='flex flex-col md-2:flex-row gap-2 md-2:gap-0 w-full'>
        <div className='flex-1 basis-[1e-9px] mr-4 w-full md-2:w-60 xm:w-[360px]'>
          <div className='leading-none w-full h-auto rounded-xl overflow-hidden relative'>
            <div className='absolute top-0 left-0 w-full h-full'>
              <Skeleton className='h-full' />
            </div>
            <LazyLoadImage
              src='/images/placeholder.jpg'
              placeholderSrc='/images/placeholder.jpg'
              effect='blur'
              width={'100%'}
              style={{ visibility: 'hidden', position: 'relative', zIndex: 0 }}
            />
          </div>
        </div>
        <div className='leading-none w-full md-2:w-[calc(100%-256px)] xm:w-[calc(100%-376px)] pr-0 md-2:pr-20'>
          <Skeleton className='h-7 mb-3' />
          <div className='leading-none w-[130px] h-3 mb-4'>
            <Skeleton className='h-full' />
          </div>
          <div className='leading-none w-[130px] h-5 mb-4'>
            <Skeleton className='h-full' />
          </div>
          <Skeleton className='h-0 md-2:h-3' />
        </div>
      </div>
    </CustomSkeletonTheme>
  )
}

export const ChannelDetailsSkeleton = () => {
  return (
    <CustomSkeletonTheme>
      <div className='flex flex-col md:flex-row items-center pt-4 pb-1 px-5 md-2:px-[50px] lg:px-[107px] max-w-[1284px] mx-auto'>
        <div className='leading-none w-20 h-20 rounded-full overflow-hidden md:mr-6 mr-0 md:mb-0 mb-3'>
          <Skeleton className='h-full' circle />
        </div>
        <div className='flex items-center md:items-start flex-col'>
          <div className='leading-none h-7 w-[150px] mb-3'>
            <Skeleton className='h-full' />
          </div>
          <div className='leading-none h-4 w-[80px]'>
            <Skeleton className='h-full' />
          </div>
        </div>
      </div>
    </CustomSkeletonTheme>
  )
}

export const VideoDetailsSkeleton = () => {
  return (
    <CustomSkeletonTheme>
      <div className='leading-none h-10'>
        <Skeleton className='h-full' />
      </div>
      <div className='flex items-center justify-between mt-3'>
        <div className='leading-none h-5 w-28'>
          <Skeleton className='h-full' />
        </div>
        <div className='leading-none h-9 w-28 rounded-full overflow-hidden'>
          <Skeleton className='h-full' />
        </div>
      </div>
      <hr className='hr my-3' />
      <div className='flex justify-between items-center'>
        <div className='flex items-center'>
          <div className='leading-none h-10 w-10 mr-3'>
            <Skeleton className='h-full' circle />
          </div>
          <div>
            <div className='leading-none h-5 w-28 mb-2'>
              <Skeleton className='h-5' />
            </div>
            <div className='leading-none h-3 w-16'>
              <Skeleton className='h-full' />
            </div>
          </div>
        </div>
        <div className='leading-none h-9 w-28 rounded-full overflow-hidden'>
          <Skeleton className='h-full' />
        </div>
      </div>
      <hr className='hr my-3' />
      <div className='leading-none h-20 rounded-xl overflow-hidden'>
        <Skeleton className='h-full' />
      </div>
    </CustomSkeletonTheme>
  )
}

export const CommentSkeleton = () => {
  return (
    <CustomSkeletonTheme>
      <div className='flex gap-5'>
        <div className='leading-none h-10 w-10'>
          <Skeleton className='h-full' circle />
        </div>
        <div className='flex flex-col w-[calc(100%-60px)]'>
          <div className='leading-none h-4 w-28 mb-2'>
            <Skeleton className='h-full' />
          </div>
          <div className='leading-none h-12'>
            <Skeleton className='h-full' />
          </div>
        </div>
      </div>
    </CustomSkeletonTheme>
  )
}

export const WatchVideoCardSkeleton = () => {
  return (
    <CustomSkeletonTheme>
      <div className='flex gap-3 mt-2'>
        <div className='leading-none rounded-md overflow-hidden w-1/2 lg:w-[180px] relative'>
          <div className='absolute top-0 left-0 w-full h-full'>
            <Skeleton className='h-full' />
          </div>
          <LazyLoadImage
            src='/images/placeholder.jpg'
            placeholderSrc='/images/placeholder.jpg'
            effect='blur'
            width={'100%'}
            style={{ visibility: 'hidden', position: 'relative', zIndex: 0 }}
          />
        </div>
        <div className='leading-none w-1/2 lg:w-[208px]'>
          <Skeleton className='h-8' />
          <div className='leading-none h-3 w-1/2 my-2'>
            <Skeleton className='h-full' />
          </div>
          <div className='leading-none h-3 w-1/2'>
            <Skeleton className='h-full' />
          </div>
        </div>
      </div>
    </CustomSkeletonTheme>
  )
}

export const ChannelIconSkeleton = () => {
  return (
    <CustomSkeletonTheme>
      <Skeleton className='h-full' circle />
    </CustomSkeletonTheme>
  )
}
