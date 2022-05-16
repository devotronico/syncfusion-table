import { IDataComplete } from "../types";

const API_URL =
  "https://services.odata.org/TripPinRESTierService/(S(hespbvdrrmhquk5vqlzcpbro))/People";

export const getData = async (): Promise<IDataComplete[]> =>
  fetch(`${API_URL}`).then((res) => res.json());
