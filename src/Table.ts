import axios from 'axios'
import { CommonParams } from './types'
import { BASE_URL } from './static'

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
  }

  public async getRows() {
    const result = await this.makeRequest('rows')
    return result
  }

  public async getTableInfo() {
    const result = await this.makeRequest('')
    return result
  }
}

export default Table
