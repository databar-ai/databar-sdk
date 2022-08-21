export type CommonParams = { [key: string]: any }

export interface PlanType {
  plan_name: string
  credits: string
  used_storage: string
  total_storage: string
  count_of_tables: number
}

export interface ListOfTablesParams { 
      page: number,
      per_page: number
}

export interface ListOfTables {
  page: number
  per_page: number
  dataset_id_based_on:number
  total_cost: number
  used_storage: number
  created_at: string
  status: string
  is_scheduled: boolean
  operations: any
}

export type ColumnTypes = {[key:string]:any}

export interface Table {
  id: number
  name: string
}
export interface TableRows {
  has_next_page: boolean
  total_count: number
  result: Array<any>
}

export interface TableInfo {
  id:number;
  name:string;
  dataset_id_based_on: number
  total_cost:number
  used_storage: number
  created_at: string
  status: string;
  is_scheduled: boolean
  operations: {[key:string]:any}
}
export interface ConfigColumns {
  hide: {[key:string]: any};
  style:  {[key:string]: any};
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