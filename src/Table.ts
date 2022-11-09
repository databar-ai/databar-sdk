import axios from 'axios'
import { DataFrame } from 'dataframe-js'
import { BASE_URL_V3 } from './static'
import { CommonParams, TableAppendData, TableColumns, TableInfo, TableRows } from './types'

class Table {
  apiKey: string
  tableId: string
  constructor(apiKey: string, tableId: string) {
    this.apiKey = apiKey
    this.tableId = tableId
  }

  private async makeGetRequest(url: string, params?: CommonParams) {
    const { data } = await axios.get(`${BASE_URL_V3}/tables/${this.tableId}/${url}`, {
      headers: {
        'X-APIKey': this.apiKey
      },
      params: params || {}
    })
    return data
  }

  private async makePostRequest(url: string, params: CommonParams) {
    const { data } = await axios.post(`${BASE_URL_V3}/tables/${this.tableId}/${url}`, {
      headers: {
        'X-APIKey': this.apiKey
      },
      params: params || {}
    })
    return data
  }

  public async getColumns(): Promise<TableColumns[]> {
    const result = await this.makeGetRequest('columns')
    return result
  }

  public async getRows(): Promise<TableRows> {
    const result = await this.makeGetRequest('rows')
    return result
  }

  public async getTableInfo(): Promise<TableInfo> {
    const result = await this.makeGetRequest('')
    return result
  }

  public async getDataFrame(): Promise<DataFrame | undefined> {
    const rows = await this.getRows()
    const columns = await this.getColumns()
    const columnsName = columns.map((el) => el.name)
    const { result: rowsResult } = rows
    const columnsRowMapping: CommonParams = {}
    columns.forEach((column) => {
      columnsRowMapping[column.internal_name] = column.name
    })
    const rowsData = rowsResult.map((row) => {
      const { id } = row
      const { data } = row
      const newObj: CommonParams = {}
      Object.keys(data).forEach((el) => {
        const elMapping = columnsRowMapping[el]
        if (elMapping) {
          newObj[elMapping] = data[el]
        }
      })
      return { id, ...newObj }
    })
    const df = new DataFrame(rowsData, columnsName)
    return df
  }

  public async appendData(params: TableAppendData) {
    const result = await this.makePostRequest('append-data', params)
    return result
  }
}

export default Table
