import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenu,
  Button,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';
import {
  ChevronDown,
  Lock,
  Activity,
  Flash,
  Server,
  TagUser,
  Scale,
} from './Icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { NAV_LINKS, NAV_LINKS_Small } from '@/constants';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import { signOut, useSession } from 'next-auth/react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  const pathName = usePathname();
  console.log(pathName);


  // const icons = {
  //   chevron: <ChevronDown fill='currentColor' size={16} />,
  //   scale: <Scale className='text-warning' fill='currentColor' size={30} />,

  //   activity: <Activity className='text-secondary' fill='green' size={30} />,

  //   user: <TagUser className='text-danger' fill='purple' size={30} />,
  // };

  const icons = {
    chevron: <ChevronDown fill='currentColor' size={16} />,
    scale: <span className='text-5xl'>🎫</span>,

    activity: <span className='text-5xl'>🕹️</span>,

    user:  <span className='text-5xl'>👻</span>,
  };

  const { data: session, status } = useSession();
  const user: any = session?.user!;
  console.log({ session }, status);

  const getBlockchainFromChainID = (chainId: number) => {
    switch (chainId) {
      case 1:
        return 'Ethereum Mainnet';
      case 56:
        return 'Binance Smart Chain';
      case 137:
        return 'Polygon';
      case 80001:
        return 'Polygon Mumbai';
      default:
        return 'Unknown';
    }
  };

  let blockchain = '';
  if (session?.user && user.chainId) {
    blockchain = getBlockchainFromChainID(user.chainId);
  } else {
    blockchain = 'Unknown';
  }

  const truncateHexAddress = (hexAddress: string) => {
    const prefix = hexAddress.slice(0, 4); // Extract the '0x' prefix
    const truncatedAddress =
      hexAddress.slice(2, 4) + '...' + hexAddress.slice(-4);
    return prefix + truncatedAddress;
  };

  const menuItems = [
    'Profile',
    'Dashboard',
    'My Settings',
    'Team Settings',
    'Help & Feedback',
    'Log Out',
  ];

  return (
    <Navbar className='z-!important' onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
        <Link href='/' color='foreground'>
          <NavbarBrand>
            <Image src='/logo.png' height={36} width={36} alt='logo' />
            <p className='font-bold text-inherit ml-3'>DNFT Ticket</p>
          </NavbarBrand>
        </Link>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className={`p-0 bg-transparent data-[hover=true]:bg-transparent text-md ${
                  pathName === '/Minting/NFTTicket' ||
                  pathName === '/Minting/DNFTStampTicket' ||
                  pathName === '/Minting/DNFTCharacterTicket'
                    ? 'text-primary'
                    : ''
                }`}
                endContent={icons.chevron}
                radius='sm'
                variant='light'
              >
                Minting
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label='ACME features'
            className='w-[340px]'
            itemClasses={{
              base: 'gap-4',
            }}
          >
            <DropdownItem
              key='autoscaling'
              description='단일 NFT로 위변조 걱정 없는 티켓을 생성하세요.'
              onPress={() => {
                router.push('/Minting/NFTTicket');
              }}
              startContent={icons.scale}
            >
              <span className='text-lg'>NFT Ticket</span>
            </DropdownItem>
            <DropdownItem
              key='usage_metrics'
              description='Stamp Board 와 Stamp NFT를 사용해서 다양한 위치 기반 이벤트를 트리거할 수 있는 티켓을 생성하세요. '
              startContent={icons.activity}
              onPress={() => {
                router.push('/Minting/DNFTStampTicket');
              }}
            >
              <span className='text-lg'> Stamp DNFT Ticket</span>
            </DropdownItem>

            <DropdownItem
              key='supreme_support'
              description='위치 기반 이벤트로 1 level ~ 5 level 까지의 성장을 할 수 있는 캐릭터 DNFT를 생성하세요.'
              startContent={icons.user}
              onPress={() => {
                router.push('/Minting/DNFTCharacterTicket');
              }}
            >
              <span className='text-lg'>Character DNFT Ticket</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {/* <NavbarItem isActive={pathName === NAV_LINKS[1].href}>
          <Link
            color={`${
              pathName === NAV_LINKS[1].href ? 'primary' : 'foreground'
            }`}
            href={NAV_LINKS[1].href}
          >
            {NAV_LINKS[1].label}
          </Link>
        </NavbarItem> */}
        <NavbarItem isActive={pathName === NAV_LINKS[4].href}>
          <Link
            color={`${
              pathName === NAV_LINKS[4].href ? 'primary' : 'foreground'
            }`}
            href={NAV_LINKS[4].href}
          >
            {NAV_LINKS[4].label}
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathName === NAV_LINKS[2].href}>
          <Link
            href={NAV_LINKS[2].href}
            color={`${
              pathName === NAV_LINKS[2].href ? 'primary' : 'foreground'
            }`}
          >
            {NAV_LINKS[2].label}
          </Link>
        </NavbarItem>
        {/* <NavbarItem
          isActive={pathName === `/MyNFT/${session?.user && user.address}`}
        >
          <Link
            color={`${
              pathName === `/MyNFT/${session?.user && user.address}`
                ? 'primary'
                : 'foreground'
            }`}
            href={`/MyNFT/${session?.user && user.address}`}
          >
            {NAV_LINKS[3].label}
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive={pathName === `/MySeries/${session?.user && user.address}`}
        >
          <Link
            color={`${
              pathName === `/MySeries/${session?.user && user.address}`
                ? 'primary'
                : 'foreground'
            }`}
            href={`/MySeries/${session?.user && user.address}`}
          >
            {NAV_LINKS[5].label}
          </Link>
        </NavbarItem> */}
      </NavbarContent>
      <NavbarContent justify='end'>
        {session?.user ? (
          <Dropdown placement='bottom-end'>
            <DropdownTrigger>
              <Avatar
                isBordered
                as='button'
                className='transition-transform'
                color='primary'
                name='Jason Hughes'
                size='sm'
                src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
              />
            </DropdownTrigger>
            <DropdownMenu aria-label='Profile Actions' variant='flat'>
              <DropdownItem key='profile' className='h-14 gap-2'>
                <p className='font-semibold'>Signed in as</p>
                <p className='font-semibold'>
                  {truncateHexAddress(user.address)}
                </p>
              </DropdownItem>
              <DropdownItem key='settings'>{blockchain}</DropdownItem>

              <DropdownItem
                onPress={() => {
                  router.push(`/MyNFT/${session?.user && user.address}`);
                }}
                key='MyNFT'
                color='secondary'
                as={Button}
                href={`/MyNFT/${session?.user && user.address}`}
                className='text-secondary-500 bg-transparent text-start'
              >
                My NFT
              </DropdownItem>


              <DropdownItem
                onPress={() => {
                  router.push(`/MySeries/${session?.user && user.address}`);
                }}
                key='MySeries'
                color='success'
                as={Button}
                href={`/MySeries/${session?.user && user.address}`}
                className='text-green-600 bg-transparent text-start'
              >
                My Series
              </DropdownItem>

              <DropdownItem
                onPress={() => {
                  signOut({ redirect: true });
                }}
                key='logout'
                color='danger'
                as={Button}
                href='/auth/login'
                className='text-red-500 bg-transparent text-start'
              >
                Sign out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <NavbarItem>
            <Button
              as={Link}
              color='success'
              href='/auth/login'
              variant='flat'
              className='text-lg'
            >
              Sign up
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu>
        {NAV_LINKS_Small.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={`${
                pathName === NAV_LINKS_Small[index].href ? 'primary' : 'foreground'
              }`}
              className='w-full'
              href={NAV_LINKS_Small[index].href}
              size='lg'
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
