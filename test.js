const chai = require('chai')
const { expect } = chai
const Databar = require('./lib')
require('dotenv').config()

const databarInstance = new Databar.default(process.env.DATABAR_API_KEY)

describe('Plan test ', () => {
  it('this should check if return have plane name', async () => {
    const req = await databarInstance.getPlanInfo()
    expect(req).to.have.own.property('plan_name')
  }).timeout(20000)
})

describe('To get list of tables ', () => {
  it('this should list of tables return include results', async () => {
    const req = await databarInstance.getListOfTables()
    expect(req).to.have.own.property('results')
  }).timeout(20000)
})

describe('Get row of table ', () => {
  it('this should check if rows have result', async () => {
    // select first table from list of tables
    const getListOfTables = await databarInstance.getListOfTables()
    const firstTableId = getListOfTables.results[0]['id']
    const table = databarInstance.getTable(firstTableId)
    const getTableRow = await table.getRows()
    expect(getTableRow).to.have.own.property('result')
  }).timeout(20000)
})

describe('Get columns of table ', () => {
  it('should check if return type is an array', async () => {
    // select first table from list of tables
    const getListOfTables = await databarInstance.getListOfTables()
    const firstTableId = getListOfTables.results[0]['id']
    const table = databarInstance.getTable(firstTableId)
    const getTableColumns = await table.getColumns()
    expect(getTableColumns).to.be.an('array')
  }).timeout(20000)
})

describe('Get Api keys', () => {
  it('should check if return type contains result', async () => {
    const req = await databarInstance.getListOfApiKeys()
    expect(req).to.have.own.property('results')
  }).timeout(20000)
})
