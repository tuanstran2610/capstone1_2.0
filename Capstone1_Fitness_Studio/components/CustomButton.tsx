import Link from 'next/link'

interface CustomButtonProps {
  text: string
  containerStyles: string
  href?: string
}

const CustomButton = ({ text, containerStyles, href }: CustomButtonProps) => {
  const buttonContent = (
    <>
      <span className="ease absolute top-1/2 h-0 w-64 origin-center -translate-x-20
      rotate-45 bg-black transition-all duration-300 group-hover:h-64
      group-hover:-translate-y-32"></span>
      <span className="ease relative text-white transition duration-300 group-hover:text-white">{text}</span>
    </>
  )

  if (href) {
    return (
      <Link 
        href={href} 
        className={`${containerStyles} group relative cursor-pointer overflow-hidden bg-red-600 uppercase flex items-center justify-center`}
      >
        {buttonContent}
      </Link>
    )
  }

  return (
    <button className={`${containerStyles} group relative cursor-pointer overflow-hidden bg-red-600 uppercase`}>
      {buttonContent}
    </button>
  )
}

export default CustomButton
