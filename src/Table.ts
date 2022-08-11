import axios from 'axios'
import { CommonParams } from './types'
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
    const { data } = await axios.get(`${BASE_URL}/${this.tableId}/${url}`, {
      headers: {
        'X-APIKey': 'r5e8G6yTRE4nmoB3XAjtLN*KYlfaqHdb2zxO9FQUCp+SP-k1'
      },
      params: params || {}
    })
    return data
  }

  public async getColumns() {
    const result = await this.makeRequest('columns')
    return result
  }

  public async getRows() {
    const result = await this.makeRequest('rows')
    return result
  }

  public async getTableInfo() {
    const result = await this.makeRequest('')
    return result
  }

  public async getDataFrame() {
    const rows = await this.getRows()
    const columns = await this.getColumns()
    const df = new DataFrame(rows, columns)
    return df
  }
}

export default Table
