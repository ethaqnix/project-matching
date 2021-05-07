import React, { FunctionComponent } from "react";
import { updateUser } from "../../api/users";
import { API_URL } from "../../App";
import MultipleSelectFromServer from "../../components/MultipleSelectFromServer";
import { useAuth } from "../../contexts/authContext/context";
import { ISkill } from "../../interfaces";

type OwnProps = {};

const Needs: FunctionComponent<OwnProps> = () => {
  const [{ passport }, setAuth] = useAuth();

  const resolver = (data: ISkill[]) => {
    if (Array.isArray(data)) {
      return data.map((skill) => ({ name: skill.content, id: skill._id }));
    }
    return [];
  };

  const onNeedsChange = async (newNeeds: any) => {
    if (passport) {
      const updatedUser = await updateUser(passport._id, {
        needs: newNeeds.map((newNeed: { id: string }) => newNeed.id),
      });

      setAuth({ type: "SET_PASSPORT", payload: updatedUser });
    }
  };
  return (
    <MultipleSelectFromServer
      title={"needs"}
      request={`${API_URL}/skills`}
      resolveResponse={resolver}
      value={passport?.needs || []}
      onChange={onNeedsChange}
    />
  );
};

export default Needs;
