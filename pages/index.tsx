import { Box, GridItem, Text, VStack } from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";
import AddMembers from "../components/AddMembers";
import CreateGroup from "../components/CreateGroup";
import useGroup from "../hooks/useGroup";
import useGroupApi from "../hooks/useGroupApi";

export default function Home() {
  const { name, members } = useGroup();
  const { setGroupName, addMember } = useGroupApi();

  const handleSetGroupName = useCallback(
    (value: string) => {
      setGroupName(value);
    },
    [setGroupName]
  );

  const handleAddMember = useCallback(
    (value: string) => {
      addMember(value);
    },
    [addMember]
  );

  console.log(members);

  return (
    <GridItem colSpan={12} display="flex" justifyContent="center" alignItems="center" py="20">
      <VStack maxW="xl" w="full" h="full" shadow="base" borderRadius="lg" p="10">
        <Text textAlign="center" fontSize="2xl" mb="5">
          그룹명을 입력하세요
        </Text>
        <Box w="full" flex="1">
          <CreateGroup onSubmit={handleSetGroupName} />
        </Box>
      </VStack>

      <AddMembers members={members} onSubmit={handleAddMember} />
    </GridItem>
  );
}
