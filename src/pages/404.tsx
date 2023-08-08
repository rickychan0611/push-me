import Image from 'next/legacy/image'

export default function FourOhFour() {
  return <div className='flex flex-col justify-center items-center p-10 h-[calc(100vh-120px)]'>
    <div className='flex flex-col justify-center items-center'>
      <Image src="/404.png" height={300} width={300} alt="404 not found"/>
      <a className='text-2xl'> OOOPS! </a>
      <a> The page you requested could not be found! </a>
    </div>
  </div>
}