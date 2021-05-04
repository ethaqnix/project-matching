import React, { FunctionComponent, useEffect, useState } from "react";
import MultipleSelectFromServer from "../../components/MultipleSelectFromServer";
import { useAuthState } from "../../contexts/authContext";
import { ISkill } from "../../interfaces";

type OwnProps = {};

const Skills: FunctionComponent<OwnProps> = () => {
  const { passport } = useAuthState();
  const [defaultValue, setDefaultValue] = useState<{ name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!passport) return;
    setDefaultValue(
      passport.skills.map((skill: any) => ({ name: skill.content }))
    );
    setLoading(false);
  }, [passport]);

  const resolver = (data: ISkill[]) => {
    if (Array.isArray(data)) {
      return data.map((skill) => ({ name: skill.content }));
    }
    return [];
  };

  const onSkillsChange = (data: any) => {
    if (passport)
      fetch(`http://localhost:8080/users/${passport._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: data.map((e: any) => e.name) }),
      });
  };
  if (loading) return null;
  return (
    <MultipleSelectFromServer
      title={"skills"}
      request={"http://localhost:8080/skills"}
      resolveResponse={resolver}
      defaultValue={defaultValue || []}
      onChange={onSkillsChange}
    />
  );
};

export default Skills;
