import { useContext } from 'react';
import Image from 'next/image';
import { Box, Icon, Flex } from '@chakra-ui/react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { Carousel } from '@material-tailwind/react';

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Flex justifyContent='center' alignItems='center' marginRight='1'>
      <Icon
        as={FaArrowAltCircleLeft}
        onClick={() => scrollPrev()}
        fontSize='2xl'
        cursor='pointer'
        d={['none','none','none','block']}
      />
    </Flex>
  );
}

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Flex justifyContent='center' alignItems='center' marginLeft='1'>
      <Icon
        as={FaArrowAltCircleRight}
        onClick={() => scrollNext()}
        fontSize='2xl'
        cursor='pointer'
        d={['none','none','none','block']}
    />
    </Flex>
  );
}
export default function ImageSrollbar({ data }) {
  return (
    <div className=''>
         <Carousel className="" autoplay loop autoplayDelay={5000}>
      {data.map((item) => (
        <div className='' key={item.id} itemId={item.id} overflow='scroll' p='1'>
          <Image className='w-full h-[500px]' placeholder="blur" blurDataURL={item.url} src={item.url} width={1000} height={500} alt=''/>
        </div>
      ))}
     
      </Carousel>
    </div>
  );
}
