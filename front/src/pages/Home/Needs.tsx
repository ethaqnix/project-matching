import React, { FunctionComponent, useEffect, useState } from "react";
import MultipleSelectFromServer from "../../components/MultipleSelectFromServer";
import { useAuth } from "../../contexts/authContext/context";
import { ISkill } from "../../interfaces";

type OwnProps = {};

const Needs: FunctionComponent<OwnProps> = () => {
  const [{ passport }, setAuth] = useAuth();
  const [defaultValue, setDefaultValue] = useState<{ name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!passport) return;
    setDefaultValue(
      passport.needs.map((skill: any) => ({ name: skill.content }))
    );
    setLoading(false);
  }, [passport]);

  const resolver = (data: ISkill[]) => {
    if (Array.isArray(data)) {
      return data.map((skill) => ({ name: skill.content }));
    }
    return [];
  };

  const onNeedsChange = async (data: any) => {
    if (passport) {
      const response = await fetch(
        `http://localhost:8080/users/${passport._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ needs: data.map((e: any) => e.name) }),
        }
      );
      const updatedUser = await response.json();
      setAuth({ type: "SET_PASSPORT", payload: updatedUser });
    }
  };
  if (loading) return null;
  return (
    <MultipleSelectFromServer
      title={"needs"}
      request={"http://localhost:8080/skills"}
      resolveResponse={resolver}
      defaultValue={defaultValue || []}
      onChange={onNeedsChange}
    />
  );
};

export default Needs;
