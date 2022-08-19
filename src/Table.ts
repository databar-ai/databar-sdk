import axios from 'axios'
import { 
  CommonParams, 
  TableColumns,
  TableRows,
  TableInfo
} from './types'
import { BASE_URL } from './static'
import { DataFrame } from "dataframe-js";

class Table {
  apiKey: string
  tableId: number
  constructor(apiKey: string, tableId: number) {
    this.apiKey = apiKey
    this.tableId = tableId
  }

  private async makeRequest(url: string, params?: CommonParams) {
    const { data } = await axios.get(`${BASE_URL}/tables/${this.tableId}/${url}`, {
      headers: {
        'X-APIKey': this.apiKey
      },
      params: params || {}
    })
    return data
  }

  public async getColumns():Promise<TableColumns[]> {
    const result = await this.makeRequest('columns')
    return result
  }

  public async getRows():Promise<TableRows> {
    const result = await this.makeRequest('rows')
    return result
  }

  public async getTableInfo():Promise<TableInfo> {
    const result = await this.makeRequest('')
    return result
  }

  public async getDataFrame() {
    try {
    const rows = await this.getRows()
    const columns = await this.getColumns()
    const columnsName = columns.map((el) => el.name)
    const {result:rowsResult} = rows
    const columnsRowMapping:CommonParams = {};
    columns.forEach((column) => {
      columnsRowMapping[column.internal_name] = column.name;
    });
    const rowsData = rowsResult.map((row) => {
      const { id } = row;
      const { data } = row;
      const newObj:CommonParams = {};
      Object.keys(data).forEach((el) => {
        const elMapping = columnsRowMapping[el];
        if (elMapping) {
          newObj[elMapping] = data[el];
        }
      });
      return { id, ...newObj };
    })
    const df = new DataFrame(rowsData, columnsName)
    return df
  } catch (e) {
    console.log("Error:", e)
  }
  }
}

export default Table
