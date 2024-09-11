import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const Botaocustomizado = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity
    style={styles.container}
    onPress={handlePress}
    activeOpacity={0.7}
    disabled={isLoading}
    >
      <Text style={styles.botaoCust}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create ({
      container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      },
      botaoCust: { 
        backgroundColor: '#BD17A1', 
        borderRadius: 50, 
        paddingVertical: 17,
        paddingHorizontal: 50, 
        color: '#FFFFFF', 
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Botaocustomizado