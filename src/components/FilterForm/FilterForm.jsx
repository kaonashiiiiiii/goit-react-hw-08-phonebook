import React from 'react'
import { useDispatch,  } from 'react-redux'
import { Form, Input } from 'antd'
import { setFilter } from 'store/slices/contactsSlice'

const FilterForm = () => {
  const dispatch = useDispatch()

  function onFilterChange (e) {
    const value = e.target.value.trim()
    if (!value) return
    dispatch(setFilter(value))
  }

  return (
    <>
      <Form
        name="filter"
        wrapperCol={{
          span: 21,
        }}
        style={{
          width: 600,
          margin: '1rem auto'
        }}
        initialValues={{
          filter: '',
        }}
        autoComplete="off"
        layout='vertical'
      >
        <Form.Item
          label="Find contacts by name"
          name="filter"
        >
          <Input onChange={onFilterChange} placeholder='Name...'/>
        </Form.Item>
      </Form>
    </>
  )
}

export default FilterForm