import { Button, Grid, Group, Stepper, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import AddMembers from "../components/AddMembers";
import CreateGroup from "../components/CreateGroup";
import SelectedGroup from "../components/SelectedGroup";
import useGroup from "../hooks/useGroup";
import useGroupApi from "../hooks/useGroupApi";

const MAX_STEP = 2;

export default function Home() {
  const { push } = useRouter();
  const { name, members } = useGroup();
  const { setGroupName, addMember } = useGroupApi();

  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < MAX_STEP ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  const completeStep = () => push("/expense");

  useEffect(() => {
    if (!name || members.length === 0) {
      return;
    }
  });

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

  const isDisabled: (active: number) => boolean = (active) => {
    if (active === 0) {
      return name === "";
    }
    if (active === 1) {
      return members.length === 0;
    }

    return false;
  };

  return (
    <>
      <Grid.Col span={12}>
        <Stepper mb="xl" active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step label="STEP. 01" description="그룹명을 입력해주세요">
            <Text>그룹명을 입력하세요</Text>
            <CreateGroup onSubmit={handleSetGroupName} />
            {name && <Text>{`작성된 그룹명: ${name}`}</Text>}
          </Stepper.Step>

          <Stepper.Step label="STEP. 02" description="그룹멤버를 등록해주세요">
            <AddMembers members={members} onSubmit={handleAddMember} />
          </Stepper.Step>

          <Stepper.Completed>
            <Text>입력한 정보를 확인하고 다음페이지를 눌러주세요!</Text>
            <SelectedGroup members={members} name={name} />
          </Stepper.Completed>
        </Stepper>

        <Group position="center">
          <Button variant="outline" onClick={prevStep}>
            이전단계로
          </Button>
          <Button disabled={isDisabled(active)} onClick={active === MAX_STEP ? completeStep : nextStep}>
            다음단계로
          </Button>
        </Group>
      </Grid.Col>
    </>
  );
}
