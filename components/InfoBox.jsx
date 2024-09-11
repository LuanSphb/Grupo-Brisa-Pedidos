import { View, Text } from 'react-native'
import React from 'react'

const InfoBox = ({title, subtitle}) => {
  return (
    <View>   
        <View style={{flex:1, flexDirection: 'row'}}>
            <Text style={{marginRight: 2}}>{subtitle}</Text>
            <Text>{title}</Text>
        </View>
    </View> 
  )
}

export default InfoBox