# Databar Javascript 

## Overview 

The SDK allows you to query tables that you’ve already created via the databar.ai UI. You can also create new rows in existing tables and get meta-data about your tables. All enrichments and automations that you set up will show up when you query your table via this SDK.

Please note, you cannot yet create new tables with the SDK. If you’d like us to add this feature, please let us know via our [Discord](https://discord.gg/nUN4w2eVNK).

## QuickStart 

### Installation 

```
yarn install databar
```

```
npm install databar
```

### Intialization 


```
import Databar from 'databar'
```


and then in code, intial databar like this 

```
const databarInstance = new Databar(apiKey)
```

## API's/Method 

### Get list of all tables

```
const listOfAllTables = databarInstance.listOfTables();
```

List of tables also take optional params as an object, type for which is 

```
export interface ListOfTablesParams { 
      page: number,
      per_page: number
}
```

#### Return type 
```
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
```


### Get Plan info 

```
const planInfo = databarInstance.getPlanInfo();
```

#### Return type 

```
export interface PlanType {
  plan_name: string
  credits: string
  used_storage: string
  total_storage: string
  count_of_tables: number
}
```

## Methods/API for specific method 

1. Get instance of specific table by doing this 

```
const table = databarInstance.getTable(tableId)
```

**Note:** You can get the specific table ID by calling `Get list of all tables` method 

### Get Columns

```
const columns = table.getColumns()
```

This should return all the colums for your table. 


#### Return Type 

```
export interface TableColumns {
  identifier: string
  internal_name: string
  name: string
  description: string | null
  enrichment_id: string | null
  color: string | null
  config: ConfigColumns
}
```

### Get Rows

```
const rows = table.getRows()
```

#### Return Type 

```
  has_next_page: boolean
  total_count: number
  result: Array<any>
```


### Get Table Info 

```
const tableInfo = table.getTableInfo()
```

#### Return type 

```
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
```


### Get DataFrame 

```
const tableDataFrame = table.getDataFrame()
```
We use [dataFrame package](https://www.npmjs.com/package/dataframe-js) to create data frame. 

You can get the data in required shape for example in case of Json, you can do something like this 

```
const tableDataFrame = table.getDataFrame().toJson()
```

For more info check the documentation of their package.