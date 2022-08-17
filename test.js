import 'dotenv/config'
import Databar from './lib'

const apiKey = process.env.DATABAR_API_KEY
console.log('API Key:', apiKey)
const databarInstance = new Databar(apiKey)

const performDatabarActions = async () => {
  const table = databarInstance.getTable(12073);
  console.log("Table:", table)
  try {
    const tablePanda = await table.getDataFrame()
    console.log('Table Panda', tablePanda)
  } catch (e) {
    console.log(e)
  }
}

performDatabarActions()
