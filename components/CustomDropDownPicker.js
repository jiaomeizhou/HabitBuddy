import { StyleSheet } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import React from 'react'

export default function CustomDropDownPicker({ open, value, listMode, items, setOpen, setValue, setItems, placeholder }) {
  return (
    <DropDownPicker
      style={styles.dropDownPickerStyle}
      open={open}
      value={value}
      listMode={listMode}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder={placeholder}
    />
  )
}

const styles = StyleSheet.create({
  dropDownPickerStyle: {
    marginVertical: 2,
    backgroundColor: 'gainsboro',
    marginBottom: 12
  },
})