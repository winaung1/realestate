import Image from 'next/image'
import React from 'react'
// import DefaultImage from '../assets/images/home.jpg';
import {FaSearch} from 'react-icons/fa'
import { useEffect, useState, useRef } from 'react';
import { Flex, Select, Box, Text, Input, Spinner, Icon, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdCancel } from 'react-icons/md';

import { filterData, getFilterValues } from '../utils/filterData';
import { baseUrl, fetchApi } from '../utils/fetchApi';
// import noresult from '../assets/images/noresult.svg';
export const Front = () => {

  const [filters] = useState(filterData);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationData, setLocationData] = useState();
  const [showLocations, setShowLocations] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const { query } = router;

    const values = getFilterValues(filterValues)

    values.forEach((item) => {
      if(item.value && filterValues?.[item.name]) {
        query[item.name] = item.value
      }
    })

    router.push({ pathname: 'search', query: query });
  };

  useEffect(() => {
    if (searchTerm !== '') {
      const fetchData = async () => {
        setLoading(true);
        const data = await fetchApi(`${baseUrl}/auto-complete?query=${searchTerm}`);
        setLoading(false);
        setLocationData(data?.hits);
      };

      fetchData();
    }
  }, [searchTerm]);

  return (
    <div className='relative '>
        <div className="h-[500px] w-full relative"> 
          <Image
            src={'/home.jpg'}
            alt="Picture of the author"
            layout="fill" // required
            objectFit="cover" // change to suit your needs
            className="w-full h-full" // just an example
          />
        </div>

        <div className='absolute inset-0 bg-black/40 text-white flex justify-center items-center flex-col'>
            <div className='items-center justify-center flex text-2xl font-bold space-x-4 lg:text-4xl'>
                <p>Buy.</p>
                <p>Rent.</p>
                <p>View.</p>
            </div>

          <div className='relative w-3/4 h-[69px] text-2xl mt-6 lg:w-1/2'>
              <input onClick={() => setShowLocations(!showLocations)} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='w-full h-full px-6 rounded text-black' type="text"  placeholder='Search for a place'/>
              <FaSearch onClick={() => setShowLocations(!showLocations)} className='text-gray-500 text-2xl absolute right-4 top-5'/>
        {showLocations && (
          <Flex flexDir='column' pos='relative' paddingTop='2'>
            {searchTerm !== '' && (
              <Icon
              as={MdCancel}
              pos='absolute'
              cursor='pointer'
              right='5'
              top='5'
              zIndex='100'
              onClick={() => setSearchTerm('')}
              />
              )}
            {loading && <Spinner margin='auto' marginTop='3' />}
            {showLocations && (
              <Box height='300px' overflow='auto'>
                {locationData?.map((location) => (
                  <Box
                  key={location.id}
                  onClick={() => {
                    searchProperties({ locationExternalIDs: location.externalID });
                    setShowLocations(false);
                    setSearchTerm(location.name);
                  }}
                  >
                    <Text cursor='pointer' className='w-full' bg='gray.800' p='2' borderBottom='1px' borderColor='gray.100' >
                      {location.name}
                    </Text>
                  </Box>
                ))}
             
              </Box>
            )}
          </Flex>
        )}
        </div>
  

        </div>
    </div>
  )
}
