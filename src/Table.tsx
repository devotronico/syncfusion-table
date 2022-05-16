import useGrid from "./useGrid";
import Controls from "./Controls";
import Loader from "./Loader";
import { DataManager, Query } from "@syncfusion/ej2-data";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Group,
  Inject,
  Page,
  PageSettingsModel,
  ColumnChooser,
  Toolbar,
  GridModel,
  Grid,
  DetailRow
} from "@syncfusion/ej2-react-grids";

export default function Table() {
  const pageSettings: PageSettingsModel = { pageSize: 5 };
  const toolbarOptions = ["ColumnChooser"];

  const {
    showTable,
    toggleTable,
    dataParent,
    dataChild,
    filterByGender,
    isLoading,
    debounceData
  } = useGrid();

  let grid: Grid | null;

  const childGrid: GridModel = {
    columns: [
      { field: "ID", headerText: "ID", textAlign: "Right", width: 120 },
      { field: "Email1", headerText: "Email1", width: 150 },
      { field: "Email2", headerText: "Email2", width: 150 }
    ],
    dataSource: dataChild,
    queryString: "ID"
  };

  const rowDataBound = (args: any): void => {
    if (grid) {
      const filter: string = args.data.ID;
      const childrecord: object[] = new DataManager(
        grid.childGrid.dataSource as object[]
      ).executeLocal(
        new Query().where("ID", "equal", parseInt(filter, 0), true)
      );
      if (childrecord.length === 0) {
        args.row.querySelector("td").innerHTML = " ";
        args.row.querySelector("td").className = "e-customizedExpandcell";
      }
    }
  };

  const setIcon = ({ Gender }: { Gender: string }) => {
    return (
      <div>
        <span className="material-symbols-outlined">
          {Gender.toLocaleLowerCase()}
        </span>
      </div>
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div id="container" className="control-section col-lg-12 spinner-target">
      <Controls
        showTable={showTable}
        toggleTable={toggleTable}
        debounceData={debounceData}
        filterByGender={filterByGender}
      />
      {!showTable ? null : (
        <GridComponent
          dataSource={dataParent}
          childGrid={childGrid}
          rowDataBound={rowDataBound}
          ref={(scope) => {
            grid = scope;
          }}
          allowPaging={true}
          pageSettings={pageSettings}
          toolbar={toolbarOptions}
          showColumnChooser={true}
        >
          <ColumnsDirective>
            <ColumnDirective field="ID" width="100" textAlign="Right" />
            <ColumnDirective field="FirstName" width="100" />
            <ColumnDirective field="LastName" width="100" />
            <ColumnDirective
              headerText="Gender"
              template={setIcon}
              width="100"
              textAlign="Right"
            />
            <ColumnDirective
              field="Age"
              width="100"
              format="C2"
              textAlign="Right"
            />
            <ColumnDirective field="Emails" headerText="Emails" width="100" />
          </ColumnsDirective>
          <Inject services={[Page, Group, Toolbar, ColumnChooser, DetailRow]} />
        </GridComponent>
      )}
    </div>
  );
}
