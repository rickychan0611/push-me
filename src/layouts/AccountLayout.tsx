import Image from "next/image";

const AccountLayout: React.FC<{ children: any }> = ({ children }) => {
  const date = new Date()

  return (
    <>
      <div className='relative lg:flex justify-center hidden'>
        <Image src='/pikadish-suite.png' width={285} height={120} sizes="100%" alt='Pikadish logo' priority
          className='absolute top-[35px] lg:left-[52px] px-[20px]' />
      </div>

      <div className='relative flex justify-center lg:hidden'>
        <Image src='/pikadish-suite.png' width={285} height={120} sizes="100%" alt='Pikadish logo' priority
          className=' lg:left-[52px] px-[20px] mt-6' />
      </div>

      <div className='w-screen mt-5 lg:h-screen flex justify-center items-center px-4'>
        <div className='rounded-2xl bg-white p-6 pt-[20px] px-4 lg:px-[40px] w-full max-w-[535px] '
          style={{ boxShadow: "0px 11px 44.2788px rgba(0, 0, 0, 0.2)" }}>
          {children}
        </div>
      </div>

      <p className='font-["Rubik"] text-[15px] text-[#B3B7B8] fixed bottom-[42px] left-[65px] font-light'>
        {`©${date.getFullYear()} Pikadish`}
      </p>
    </>
  )
}

export const getLayout = (page: any) => <AccountLayout>{page}</AccountLayout>;

export default AccountLayout;
