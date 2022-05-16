import { useState, useEffect, useMemo, useCallback } from "react";
import { IGridParent, IGridChild } from "./types";
import { useSelector, useDispatch } from "react-redux";
import { selectData, fetchData } from "./lib/store";

export default function useGrid() {
  const dispatch = useDispatch();
  const [showTable, setShowTable] = useState(true);
  const data: IGridParent[] = useSelector(selectData);
  const [dataParent, setDataParent] = useState<IGridParent[]>([]);
  const [dataChild, setDataChild] = useState<IGridChild[]>([]);

  useEffect(() => {
    if (!data) {
      dispatch(fetchData());
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (data?.length > 0) {
      setDataParent([...data]);

      setDataChild([
        ...data.map((person: IGridParent) => {
          let newPerson = { ID: person.ID };
          person.Emails.forEach((email: string, index: number) => {
            newPerson = { ...newPerson, [`Email${index + 1}`]: email };
          });
          return newPerson;
        })
      ]);
    }
  }, [data]);

  const filterByGender = useCallback(
    (gender: string) => {
      setDataParent(
        data.filter((o: IGridParent) => {
          return o.Gender === gender;
        })
      );
    },
    [data]
  );

  const debounceData = useCallback(
    (timeout: number) => {
      setDataParent([]);
      setTimeout(() => {
        dispatch(fetchData());
      }, timeout);
    },
    [dispatch]
  );

  const isLoading = useMemo(() => {
    return dataParent.length ? false : true;
  }, [dataParent]);

  const toggleTable = useCallback(() => {
    setShowTable(!showTable);
  }, [showTable]);

  return {
    showTable,
    toggleTable,
    dataParent,
    dataChild,
    filterByGender,
    isLoading,
    debounceData
  };
}
