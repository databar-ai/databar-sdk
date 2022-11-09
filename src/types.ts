export type CommonParams = { [key: string]: any }

export interface PlanType {
  plan_name: string
  credits: string
  used_storage: string
  total_storage: string
  count_of_tables: number
}

export interface ListOfTablesParams {
  page: number
  per_page: number
}

interface Tables {
  page: number
  per_page: number
  dataset_id_based_on: number
  total_cost: number
  used_storage: number
  created_at: string
  status: string
  is_scheduled: boolean
  operations: any
}

export interface ListOfTables {
  count: number
  next: any //TODO: Incorrect Type
  previous: any //TODO: Incorrect Type
  results: Array<Tables>
}

export type ColumnTypes = { [key: string]: any }

export interface Table {
  identifier: string
  name: string
}
export interface TableRows {
  has_next_page: boolean
  total_count: number
  result: Array<any>
}

export interface TableInfo {
  identifier: string
  name: string
  dataset_id_based_on: number
  total_cost: number
  used_storage: number
  created_at: string
  status: string
  is_scheduled: boolean
  operations: { [key: string]: any }
}
export interface ConfigColumns {
  hide: { [key: string]: any }
  style: { [key: string]: any }
}

export interface TableColumns {
  identifier: string
  internal_name: string
  name: string
  description: string | null
  enrichment_id: string | null
  color: string | null
  config: ConfigColumns
}

export interface TableAppendData {
  parameters: CommonParams
  pagination?: number
  authorization_id?: number
}

//TODO: Type is incorrect
export interface ListOfApiKeys {
  count: number
  next: any
  previousAny: any
  results: Array<any>
}
