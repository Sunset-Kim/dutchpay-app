import { Box, GridItem, Text, VStack } from "@chakra-ui/react";
import AddMembers from "../components/AddMembers";
import CreateGroup from "../components/CreateGroup";

export default function Home() {
  return (
    <GridItem colSpan={12} display="flex" justifyContent="center" alignItems="center" py="20">
      <VStack maxW="xl" w="full" h="full" shadow="base" borderRadius="lg" p="10">
        <Text textAlign="center" fontSize="2xl" mb="5">
          그룹명을 입력하세요
        </Text>
        <Box w="full" flex="1">
          <CreateGroup onSubmit={() => {}} />
        </Box>
      </VStack>

      <AddMembers />
    </GridItem>
  );
}
