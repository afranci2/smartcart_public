import react from "react";
import {
  Flex,
  Divider,
  Text,
  IconButton,
  Image,
  Box,
  Heading,
  Tag,
  HStack,
  VStack,
  Icon,
  Link,
  Center,
  Tooltip,
  Grid,
  Spacer
} from "@chakra-ui/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons"
import { BsPeopleFill, BsClockFill } from "react-icons/bs";
import { BsFillBookmarkFill } from "react-icons/bs";

function randitem(x: String[]) {
  return x[Math.floor(Math.random()*x.length)]
}

export default function RecipeCard(props: {
  recipeData?: { title: String; serving: String; time: String; image: String, Key: String, funFacts: String[]};
}) {
  const recipeData = props.recipeData;
  if (!recipeData) {
    console.log('Error: no recipe data found.');
    return {}
  };
  const recipe_url = "/recipe/" + recipeData.Key.toString();
  const funFacts = { data: recipeData.funFacts };
  return (
    <Box
      bg="whiteAlpha.900"
      minW="350px"
      maxW="350px"
      boxShadow="2xl"
      borderRadius="xl"
    >
      <Flex>
        <Box></Box>
        <Spacer/>
        <Center>
          <Image borderTopRadius="xl" w={"auto"} height={40} style={{ alignSelf: 'center' }} src={recipeData.image.toString()} />
        </Center>
        <Spacer/>
        <Box display="flex" justify="right" alignItems="right">
          <Tooltip label={randitem(recipeData.funFacts)}>
            <QuestionOutlineIcon />
          </Tooltip>
        </Box>
      </Flex>
      <Box p={6} pt={3}>
        {/* <Tag fontSize="x-small">RECIPE</Tag> */}
        <Flex justifyContent="space-between" alignItems="center">
        <Link href={recipe_url}>
          <Heading size="md">{recipeData.title}</Heading>
        </Link>
          <Box>
            {/* TODO */}
            <IconButton
              aria-label="bookmark"
              icon={<BsFillBookmarkFill />}
              variant="ghost"
            />
          </Box>
        </Flex>
      </Box>
      <Box
        bg="gray.200"
        borderBottomRadius="xl"
        p={3}
        w="100%"
        align="center"
        fontSize={25}
      >
        <HStack spacing={10} mt={4} justify="center">
          <VStack>
            <Icon fontSize={24} aria-label="Clock" as={BsClockFill}></Icon>
            <Text fontSize={18}>{recipeData.time}</Text>
          </VStack>
          <VStack>
            <Icon fontSize={24} aria-label="People" as={BsPeopleFill} />
            <Text fontSize={18}>Serves {recipeData.serving}</Text>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
}
