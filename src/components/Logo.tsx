import logo from '@/images/logo-black.svg'
import logoInverted from '@/images/logo-white.svg'
import Image from 'next/image'

export function Logo({
  className,
  invert,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & {
  invert?: boolean
}) {
  return <Image className={className} src={invert ? logoInverted : logo} alt="Purple Street logo" unoptimized />
}
