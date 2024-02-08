import { Loader } from 'lucide-react'
import React from 'react'

type Props = {}

const Loading = (props: Props) => {
  return (
    <div className='flex w-full h-screen items-center justify-center'>
        <Loader className='animate-spin '></Loader>
    </div>
  )
}

export default Loading