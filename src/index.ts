import { CommonParams, PlanType, listOfTables } from './types'
import axios from 'axios'
import { BASE_URL } from './static'
import Table from './Table'
class Databar {
  apiKey: string
  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  private async makeRequest(url: string, params?: CommonParams) {
    const { data } = await axios.get(`${BASE_URL}/${url}`, {
      headers: {
        'X-APIKey': 'r5e8G6yTRE4nmoB3XAjtLN*KYlfaqHdb2zxO9FQUCp+SP-k1'
      },
      params: params || {}
    })
    return data
  }

  public getTable(tableId: number): Table {
    const results = new Table(this.apiKey, tableId)
    return results
  }

  public async getPlanInfo(): Promise<PlanType> {
    const results = await this.makeRequest('users/plan-info/')
    return results
  }

  public async listOfTables(userParams?: listOfTables) {
    const params = userParams || {
      page: 1,
      per_page: 100
    }
    const results = await this.makeRequest('/tables', params)
    return results
  }
}

export default Databar
