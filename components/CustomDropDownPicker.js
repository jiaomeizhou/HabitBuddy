import { StyleSheet } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import React from 'react'
import { Styles } from '../components/Styles';

export default function CustomDropDownPicker({ open, value, listMode, items, setOpen, setValue, setItems, placeholder }) {
  return (
    <DropDownPicker
      open={open}
      value={value}
      listMode={listMode}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder={placeholder}
      containerStyle={{ width: '85%', alignSelf: 'center'}}
      style={Styles.dropDownPicker}
    />
  )
}