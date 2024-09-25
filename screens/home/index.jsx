import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../constants/colors'
import { auth } from '../../config/firebaseConfig'

const Home = () => {
  return (
    <View style={{display : 'flex'}}>
      <Text style={{fontSize: 50,color : 'black',paddingBottom : 200}}>Home</Text>
      <Button title='Sign out' onPress={()=>auth.signOut()} />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})