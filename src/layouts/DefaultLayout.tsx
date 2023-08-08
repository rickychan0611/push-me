import React, { useState } from 'react'
import SideBar from '../components/SideBar';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import Notifications from '../components/Notifications';

const DefaultLayout = ({ children }: { children: any }) => {

  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [openNotifications, setOpenNotification] = useState<boolean>(false)

  const close = () => {
    setOpenNotification(false)
  }

  return (
    <div className='bg-[#F7FAFC] flex flex-row'>

      <div className='fixed top-[20px] sm:top-[44px] right-[20px] z-50 w-[300px]'>

        {/* logo and notification */}
        <div className='flex-col justify-end'>
          <div className='pr-[0px] sm:pr-[43px]'>
            <div className='relative flex justify-end '>
              <div
                tabIndex={0}
                onClick={() => { setOpenNotification(!openNotifications) }}
                onBlur={close}
              >
                <Image src="/dummy/logo.png" alt="store" width={45} height={45} className='rounded-full cursor-pointer' />
              </div>
            </div>
            {/* red dot on logo*/}
            <div className='absolute top-[0] right-[0px] sm:right-[43px] bg-[#EB9098] w-[10px] h-[10px] rounded-full' />
          </div>
          {openNotifications && <Notifications close={close} />}
        </div>

      </div>

      <div className='fixed top-[8px] left-[7px] cursor-pointer md:hidden m-3 z-50 '>
        <div className='flex justify-center items-center bg-white w-[45px] h-[45px] rounded-full'>
          <MenuIcon
            onClick={() => setShowMenu(!showMenu)}
          />
        </div>
      </div>
      <div className='md:block bg-white border-x'>
        <SideBar showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>

      {children}
    </div >
  )
}

export const getLayout = (page: any) => <DefaultLayout>{page}</DefaultLayout>;

export default DefaultLayout 