import {
  Avatar,
  Box,
  Collapse,
  Center,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { FaBell, FaClipboardCheck, FaRss } from "react-icons/fa";
import { AiFillGift } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { FiMenu, FiSearch } from "react-icons/fi";
import { HiCode, HiCollection } from "react-icons/hi";
import { MdHome, MdKeyboardArrowRight, MdList } from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import React, {useState} from 'react'
import Link from "next/link";

export default function PageLayout(props) {
  const sidebar = useDisclosure();
  const integrations = useDisclosure();
  const [activePage, setActivePage] = useState("");

  const NavItem = (props) => {
    const { icon, children, pageURL, ...rest } = props;

    return (
      <Link href={pageURL}>
        <Flex
          align="center"
          px="4"
          pl="4"
          py="3"
          cursor="pointer"
          m={2}
          borderRadius={10}
          color={activePage === pageURL ? "gray.900" : "gray.400"}
          bg={activePage === pageURL ? "gray.100" : "white"}  
          // _hover={{
          //   bg: useColorModeValue("gray.100", "gray.900"),
          //   color: useColorModeValue("gray.900", "gray.200"),
          // }}
          role="group"
          fontWeight="semibold"
          transition=".15s ease"
          fontSize={18}
          onClick={() => setActivePage(pageURL)}
          {...rest}
        >
            <Icon
              mr="2"
              boxSize="4"
              _groupHover={{
                color: useColorModeValue("gray.600", "gray.300"),
              }}
              as={icon}
            />
          {children}
        </Flex>
      </Link>
    );
  };

  const SidebarContent = (props) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg={useColorModeValue("white", "gray.800")}
      borderColor={useColorModeValue("inherit", "gray.700")}
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <Text
          fontSize="2xl"
          ml="2"
          color={useColorModeValue("brand.500", "white")}
          fontWeight="semibold"
        >
          URI-Smartcart
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <NavItem icon={MdHome} pageURL="/">
          Home
        </NavItem>
        {/* <NavItem icon={FaRss}>Articles</NavItem> */}
        {/* <NavItem icon={HiCollection}>Collections</NavItem> */}
        {/* <NavItem icon={FaClipboardCheck}>Checklists</NavItem> */}
        {/* <NavItem icon={HiCode} onClick={integrations.onToggle}>
          Integrations
          <Icon
            as={MdKeyboardArrowRight}
            ml="auto"
            transform={integrations.isOpen && "rotate(90deg)"}
          />
        </NavItem>
        <Collapse in={integrations.isOpen}>
          <NavItem pl="12" py="2">
            Shopify
          </NavItem>
          <NavItem pl="12" py="2">
            Slack
          </NavItem>
          <NavItem pl="12" py="2">
            Zapier
          </NavItem>
        </Collapse>
        <NavItem icon={AiFillGift}>Changelog</NavItem> */}
        <NavItem pageURL="/recipes" icon={MdList}>Recipes</NavItem>
        <NavItem pageURL="/settings" icon={BsGearFill}>Settings</NavItem>

        {/* <Button onClick={signOut} variant="ghost">
          Sign Out
        </Button> */}
      </Flex>
    </Box>
  );

  return (
    <Box
      as="section"
      bg={useColorModeValue("gray.50", "gray.700")}
      minH="100vh"
    >
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        {/* <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg={useColorModeValue("white", "gray.800")}
          borderBottomWidth="1px"
          borderColor={useColorModeValue("inherit", "gray.700")}
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
           */}
          {/* <InputGroup w="96" display={{ base: "none", md: "flex" }}>
              <InputLeftElement color="gray.500" children={<FiSearch />} />
              <Input placeholder="Search for articles..." />
            </InputGroup>
  
            <Flex align="center">
              <Icon color="gray.500" as={FaBell} cursor="pointer" />
              <Avatar
                ml="4"
                size="sm"
                name="anubra266"
                src="https://avatars.githubusercontent.com/u/30869823?v=4"
                cursor="pointer"
              />
            </Flex> */}
        {/* </Flex> */}
          
        <Box as="main" p="4">
          {/* <Center mb={20}> */}
          {props.children}
          {/* </Center> */}
        </Box>
      </Box>
    </Box>
  );
}
