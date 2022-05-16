export interface IGridChild {
  [k: string]: string | number;
}
export interface IGridParent {
  ID: number;
  FirstName: string;
  LastName: string;
  Gender: "Male" | "Female";
  Age: string;
  Emails: string[];
}

export interface IData extends Omit<IGridParent, "ID" | "Age" | "Emails"> {
  UserName: string;
  MiddleName: null;
  Age: null;
  Emails: string[];
  FavoriteFeature: string;
  Features: string[];
  AddressInfo: [
    {
      Address: string;
      City: {
        Name: string;
        CountryRegion: string;
        Region: string;
      };
    }
  ];
  HomeAddress: null;
}

export interface IDataComplete {
  value: IData[];
}
