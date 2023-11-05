import { createSelector } from "reselect"

const getContacts = (state) => state.contacts.contacts.items

const getContactsFilter = (state) => state.contacts.filter

const getContactsLoadingStatus = (state) => state.contacts.contacts.isLoading

const getContactsError = (state) => state.contacts.contacts.error

const getFilteredTableContacts = createSelector(
  getContacts,
  getContactsFilter,
  (contacts, filter) => {
    const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter.trim().toLowerCase()))
    return filteredContacts.map(contact => ({
      key: contact.id,
      name: contact.name,
      number: contact.number
    }))
  }
)

export {
  getContacts,
  getContactsFilter,
  getContactsError,
  getContactsLoadingStatus,
  getFilteredTableContacts
}