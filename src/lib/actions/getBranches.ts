import { STORE } from "../constains/constains";
import { BranchesDto } from "@/types/branches";

const URL = `${STORE}/api/home/branches`;

const getBranches = async (): Promise<BranchesDto[]> => {

  const res = await fetch(`${URL}`, {
    cache: "no-store",
  });

  return res.json();
};

export default getBranches;