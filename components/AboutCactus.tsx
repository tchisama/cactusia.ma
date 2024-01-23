import { Leaf } from 'lucide-react'
import React from 'react'

type Props = {}

function AboutCactus({}: Props) {
  return (
    <div className='mt-20'>
        <h1 className='md:text-5xl text-3xl'>About The Cactus</h1>
        <h3 className='md:text-2xl text-xl text-green-600 flex gap-4 items-center'><Leaf/> Ferocactus Echidne</h3>
        <p className='max-w-5xl md:text-lg text-sm mt-2'>
            Ferocactus Echidne is a cactus species that is known for its large, round leaves and colorful flowers. It is a popular choice for indoor and outdoor use, particularly in tropical regions. Ferocactus Echidne is a cactus species that is known for its large, round leaves and colorful flowers. It is a popular choice for indoor and outdoor use, particularly in tropical regions. Ferocactus Echidne is a cactus species that is known for its large, round leaves and colorful flowers. It is a popular choice for indoor and outdoor use, particularly in tropical regions.    
        </p>
    </div>
  )
}

export default AboutCactus