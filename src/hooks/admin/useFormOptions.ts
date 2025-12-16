import { useEffect, useState } from "react";
import axios from "axios";

type Option = { label: string; value: string | number };

export default function useFormOptions(keys: string[]) {
  const [optionsMap, setOptionsMap] = useState<Record<string, Option[]>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!keys.length) return;

    setLoading(true);

    Promise.all(
      keys.map(async (key) => {
        const res = await axios.get(`/api/options/${key}`);        
        return { key, data: res.data };
      })
    )
      .then((results) => {
        const map: Record<string, Option[]> = {};
        results.forEach(({ key, data }) => {
          map[key] = data;
        });
        setOptionsMap(map);
      })
      .finally(() => setLoading(false));
  }, [keys]);

  return { optionsMap, loading };
}
