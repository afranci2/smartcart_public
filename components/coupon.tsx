import react from 'react'
import {Flex, Divider, Text, IconButton, Box, Heading, Tag} from '@chakra-ui/react'
import {BsFillBookmarkFill, BsBookmarkFill, BsBookmark} from "react-icons/bs"


// const defaultCoupon = {
//     title: "bannanas",
//     discount: "99% OFF",
//     expires: "12/31/99",
//     description: "Good 4 u",
//     saved: true
// }


export default function CouponCard (props: { couponData: { title: String, discount: String, expires: String, description: String, saved?: Boolean, weekly_release?: Boolean, active?: Boolean } }) {
    const couponData = props.couponData;
    
    return (
        <Box bg="whiteAlpha.900" minW="350px" maxW="350px" boxShadow="2xl" borderRadius="xl">
            <Box p={6} pt={3}>
                <Tag fontSize="x-small">COUPON</Tag>
                {couponData.weekly_release &&  <Tag fontSize="x-small" backgroundColor="yellow.100">WEEKLY RELEASE</Tag>}
            <Flex
               justifyContent="space-between" 
               alignItems="center"
            >
                <Heading size="md">{couponData.title}</Heading>
                <Box>
                    <IconButton aria-label="bookmark" icon={couponData.saved ? <BsFillBookmarkFill /> : <BsBookmark />} 
                    variant="ghost"/>
                </Box>
            </Flex>
            <Text align="center" minH="50px">
                {couponData.description}
            </Text>
            </Box>
            <Box
                bg="gray.200"
                borderBottomRadius="xl"
                p={3}
                w="100%"
                align="center"
                fontSize={25}
            >
                {couponData.discount} 
                <Text
                    fontSize={15}
                    color="gray.500"
                >
                    Expires {couponData.expires}
                </Text>
            </Box>
        </Box>
    )
} 
