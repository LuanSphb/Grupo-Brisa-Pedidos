import { View, Text, Image } from 'react-native'
import React from 'react'
import Vazio from './../assets/images/Vazio.png'
import Botaocustomizado from './Botaocustomizado'
import { router }  from 'expo-router'

const EmptyState = ({ title, subtitle }) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={Vazio} style={{height: 200, width: 200}} />
        <Text>
            {title}
        </Text>
        <Text>
            {subtitle}
        </Text>

        <Botaocustomizado 
        title='Criar pedido'
        handlePress={() => router.push ('/criar')}
        />
    </View>
  )
}

export default EmptyState