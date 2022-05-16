import { enableRipple } from "@syncfusion/ej2-base";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

interface IProps {
  showTable: boolean;
  toggleTable: () => void;
  debounceData: (timeout: number) => void;
  filterByGender: (gender: string) => void;
}

export default function Controls({
  showTable,
  toggleTable,
  debounceData,
  filterByGender
}: IProps) {
  enableRipple(true);

  // if (!showTable) {
  //   return (
  //     <>
  //       <ButtonComponent onClick={toggleTable}>show table</ButtonComponent>
  //       <h2>Tabella nascosta</h2>
  //     </>
  //   );
  // }

  return (
    <>
      {!showTable ? (
        <>
          <ButtonComponent onClick={toggleTable}>show table</ButtonComponent>
          <h2>Tabella nascosta</h2>
        </>
      ) : (
        <>
          <ButtonComponent onClick={toggleTable}>hide table</ButtonComponent>
          <ButtonComponent onClick={() => debounceData(5000)}>
            debouce data
          </ButtonComponent>
          <ButtonComponent onClick={() => filterByGender("Male")}>
            filter by male
          </ButtonComponent>
          <ButtonComponent onClick={() => filterByGender("Female")}>
            filter by female
          </ButtonComponent>
        </>
      )}
    </>
  );
}
