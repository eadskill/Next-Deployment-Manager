'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InstanceSchema extends Schema {
  up () {
    this.create('instances', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('instances')
  }
}

module.exports = InstanceSchema
