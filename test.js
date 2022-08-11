import 'dotenv/config'
import Databar from './lib'

const apiKey = process.env.DATABAR_API_KEY

const databarInstance = new Databar(apiKey)

const performDatabarActions = async () => {
  const planInfo = await databarInstance.getPlanInfo()
  console.log('Plan Info:', planInfo)
  const listOfTables = await databarInstance.listOfTables()
  console.log('List of tables:', listOfTables)
}

performDatabarActions()
