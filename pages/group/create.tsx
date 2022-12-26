import { Button, Grid, Group, Highlight, Stack, Stepper, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import AddMembers from "../../components/group/AddGroupMembers";
import CreateGroup from "../../components/group/CreateGroup";
import GroupCard from "../../components/group/GroupCard";
import useGroup from "../../hooks/useGroup";

const MAX_STEP = 2;

export default function GroupCreate() {
  const { addGroup } = useGroup();

  const { push } = useRouter();
  const [members, setMembers] = useState<string[]>([]);
  const [name, setName] = useState<string>("");

  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < MAX_STEP ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  const completeStep = () => {
    if (!name || !members || members.length === 0) {
      return;
    }
    const group = {
      id: new Date().getTime().toString(),
      name,
      members,
    };

    addGroup(group);
    push(group.id);
  };

  const isDisabled: (active: number) => boolean = (active) => {
    if (active === 0) {
      return name === "";
    }
    if (active === 1) {
      return members.length === 0;
    }

    return false;
  };

  const addMembers = (value: string | string[]) => {
    Array.isArray(value) ? setMembers((prev) => [...prev, ...value]) : setMembers((prev) => [...prev, value]);
  };

  return (
    <Grid.Col>
      <Stack spacing={0}>
        <Stepper mb="xl" active={active} onStepClick={setActive}>
          <Stepper.Step label="STEP. 01" description="그룹명을 입력해주세요">
            {name ? (
              <Highlight size={"lg"} weight={700} highlight={name}>{`${name} 맞나요?`}</Highlight>
            ) : (
              <Text size={"lg"} weight={700}>
                그룹명을 입력해주세요
              </Text>
            )}

            <CreateGroup onSubmit={setName} />
          </Stepper.Step>

          <Stepper.Step label="STEP. 02" description="그룹멤버를 등록해주세요" allowStepSelect={!!name}>
            <AddMembers
              members={members}
              onSubmit={addMembers}
              onDelete={(name) => setMembers((prev) => prev.filter((members) => members !== name))}
            />
          </Stepper.Step>

          <Stepper.Completed>
            <Stack>
              <Stack py="lg" spacing={0}>
                <Highlight size={"lg"} weight={700} highlight={[name]}>
                  {`그룹이름은 ${name},`}
                </Highlight>
                <Highlight highlightColor={"pink"} size={"lg"} weight={700} highlight={[...members]}>
                  {`그룹멤버는 ${
                    members.length > 4 ? `${members[0]}외 ${members.length}명` : members.join(",")
                  } 입니다`}
                </Highlight>
                <Text size={"lg"} weight={700}>
                  확인 버튼을 누르고 정산하러 갈까요?
                </Text>
              </Stack>

              <GroupCard
                group={{
                  id: new Date().getTime().toString(),
                  name,
                  members,
                }}
                readonly
              />
            </Stack>
          </Stepper.Completed>
        </Stepper>

        <Group position="center">
          <Button disabled={active <= 0} variant="outline" onClick={prevStep}>
            이전단계로
          </Button>
          <Button disabled={isDisabled(active)} onClick={active === MAX_STEP ? completeStep : nextStep}>
            {active === MAX_STEP ? "정산하러가기" : "다음단계로"}
          </Button>
        </Group>
      </Stack>
    </Grid.Col>
  );
}
