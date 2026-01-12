import { useEffect } from "react";
import { useDropdownDataStore } from "@/store/common/useDropdownDataStore";

export default function useFormOptions(optionKeys: string[]) {
  const { data, fetchKeys } = useDropdownDataStore();

  useEffect(() => {
    if (optionKeys.length) {
      fetchKeys(optionKeys);
    }
  }, [optionKeys, fetchKeys]);

  return {
    optionsMap: data,
  };
}
