export type CommonParams = { [key: string]: any }

export interface PlanType {
  plan_name: string
  credits: string
  used_storage: string
  total_storage: string
  count_of_tables: number
}

export interface listOfTables {
  page: number
  per_page: number
}
