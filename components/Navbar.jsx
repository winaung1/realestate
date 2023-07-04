import Link from 'next/link';
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Flex, Box, Spacer } from '@chakra-ui/react';
import { FcMenu, FcHome, FcAbout } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs';
import { FiKey } from 'react-icons/fi';
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react';
const Navbar = () => {
  const [color, setColor] = useState('text-white')
  const [show, setShow] = useState(false)
  const router = useRouter()

  useEffect(() => {

    if(router.pathname == '/'){
      setColor('text-white')
      setShow(true)
    }
    if(router.pathname == '/search'){
      setColor('text-black')
      setShow(false)
    }
  }, [router.pathname])
  return (
    <Flex className='absolute top-5 left-0 w-full z-[1000] p-4'>
    <Box className={show && `text-3xl ${color} flex justify-center font-semibold`}>
      <Link href='/' paddingLeft='2'>WinRealtor</Link>
    </Box>
    <Spacer />
    <Box>
      <Menu>
        <MenuButton as={IconButton} icon={<FcMenu />} variant='outline' color='red.400' />
        <MenuList>
          <Link href='/' passHref>
            <MenuItem icon={<FcHome />}>Home</MenuItem>
          </Link>
          <Link href='/search' passHref>
            <MenuItem icon={<BsSearch />}>Search</MenuItem>
          </Link>
          <Link href='/search?purpose=for-sale' passHref>
            <MenuItem icon={<FcAbout />}>Buy Property</MenuItem>
          </Link>
          <Link href='/search?purpose=for-rent' passHref>
            <MenuItem icon={<FiKey />}>Rent Property</MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </Box>
  </Flex>
);
}

export default Navbar;
