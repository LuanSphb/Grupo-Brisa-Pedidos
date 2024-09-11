import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen 
        name='logar'
        options={{
          headerShown: false
        }}
        />

        <Stack.Screen 
        name='registrar'
        options={{
          headerShown: false
        }}
        />
      </Stack>
      <StatusBar backgroundColor='#BD17A1' style='light'/>
    </>
  )
}

export default AuthLayout