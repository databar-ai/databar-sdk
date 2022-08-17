import axios from 'axios'
import { 
  CommonParams, 
  TableColumns,
  TableRows,
  TableInfo
} from './types'
import { BASE_URL } from './static'
import DataFrame from 'dataframe-js'

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
    const rows = await this.getRows()
    const columns = await this.getColumns()
    console.log('DF:', rows, columns)
    const df = new DataFrame(rows, columns)
    return df
  }
}

export default Table
