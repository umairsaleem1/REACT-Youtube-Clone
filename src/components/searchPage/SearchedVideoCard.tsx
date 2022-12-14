import { Link, useNavigate } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useQuery } from '@tanstack/react-query'
import numeral from 'numeral'
import moment from 'moment'

import { SearchItem } from '../../types/search.types'
import { getVideoDetails, getChannelIcon } from '../../api'
import { ChannelIconSkeleton, SearchedVideoCardSkeleton } from '../skeletons'
import { calculateVideoDuration } from '../../utils/shared/calculateVideoDuration.util'

type IProps = {
  video: SearchItem
}
const SearchedVideoCard = ({ video }: IProps) => {
  const { id, snippet } = video
  const { thumbnails, description, publishedAt, title, channelTitle, channelId } = snippet

  const videoId = id.videoId

  const { isLoading, data } = useQuery({
    queryKey: ['videoDetails', videoId],
    queryFn: () => getVideoDetails(videoId as string),
    refetchOnWindowFocus: false,
    staleTime: 1200000,
    cacheTime: 1200000,
  })

  const { isLoading: isLoadingChannelIcon, data: channelData } = useQuery({
    queryKey: ['channelIcon', channelId],
    queryFn: () => getChannelIcon(channelId),
    refetchOnWindowFocus: false,
    staleTime: 1200000,
    cacheTime: 1200000,
  })

  const navigate = useNavigate()

  const redirectToChannel = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    e.preventDefault()
    navigate(`/channel/${channelId}`)
  }
  return isLoading ? (
    <SearchedVideoCardSkeleton />
  ) : (
    <Link to={`/watch/${videoId}`}>
      <div className='flex flex-col md-2:flex-row gap-2 md-2:gap-0 w-full'>
        <div className='flex-1 basis-[1e-9px] mr-4 w-full md-2:w-60 xm:w-[360px]'>
          <div className='flex items-center w-full h-auto rounded-xl overflow-hidden relative'>
            <LazyLoadImage
              src={thumbnails.medium.url}
              alt='thumbnail'
              placeholderSrc={thumbnails.medium.url}
              effect='blur'
              width={'100%'}
              style={{ objectFit: 'cover' }}
            />
            <div className='absolute right-0 bottom-0 m-1 rounded flex items-center text-xs px-1 font-sans bg-black text-white'>
              {calculateVideoDuration(data?.data.items[0].contentDetails.duration as string)}
            </div>
          </div>
        </div>
        <div className='w-full md-2:w-[calc(100%-256px)] xm:w-[calc(100%-376px)] pr-0 md-2:pr-20'>
          <h3 className='heading-md overflowed-text2'>{title}</h3>
          <p className='para-sm'>
            {numeral(data?.data.items[0].statistics.viewCount).format('0.a')} views &nbsp;-{' '}
            {moment(publishedAt).fromNow()}
          </p>
          <div className='flex items-center py-3'>
            {isLoadingChannelIcon ? (
              <div className='leading-none w-6 h-6 mr-2'>
                <ChannelIconSkeleton />
              </div>
            ) : (
              <div className='flex mr-2 w-6 h-6 rounded-full overflow-hidden'>
                <LazyLoadImage
                  src={channelData?.data.items[0].snippet.thumbnails.medium.url}
                  alt='channelLogo'
                  placeholderSrc={channelData?.data.items[0].snippet.thumbnails.medium.url}
                  effect='blur'
                  width={'100%'}
                  onClick={redirectToChannel}
                />
              </div>
            )}
            <p
              className='para-sm overflowed-text1 hover:text-black dark:hover:text-white'
              onClick={redirectToChannel}
            >
              {channelTitle}
            </p>
          </div>
          <p className='para-sm overflowed-text1 '>{description}</p>
        </div>
      </div>
    </Link>
  )
}

export default SearchedVideoCard
