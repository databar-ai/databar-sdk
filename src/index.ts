import axios from 'axios'
import { BASE_URL_V2, BASE_URL_V3 } from './static'
import Table from './Table'
import { CommonParams, ListOfTables, ListOfTablesParams, PlanType } from './types'

class Databar {
  apiKey: string
  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  private async makeRequest(base_url: string, url: string, params?: CommonParams) {
    const { data } = await axios.get(`${base_url}${url}`, {
      headers: {
        'X-APIKey': this.apiKey
      },
      params: params || {}
    })
    return data
  }

  public getTable(tableId: string): Table {
    const results = new Table(this.apiKey, tableId)
    return results
  }

  public async getListOfApiKeys(userParams?: ListOfTablesParams) {
    const params = userParams || {
      page: 1,
      per_page: 100
    }
    const result = await this.makeRequest(BASE_URL_V2, '/apikeys', params)
    return result
  }

  public async getPlanInfo(): Promise<PlanType> {
    const results = await this.makeRequest(BASE_URL_V2, '/users/plan-info/')
    return results
  }

  public async getListOfTables(userParams?: ListOfTablesParams): Promise<ListOfTables> {
    const params = userParams || {
      page: 1,
      per_page: 100
    }
    const results = await this.makeRequest(BASE_URL_V3, '/tables', params)
    return results
  }
}

export default Databar
