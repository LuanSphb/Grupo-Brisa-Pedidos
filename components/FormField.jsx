import { View, Text, TextInput, TouchableOpacity, Image, TextInputComponent} from 'react-native'
import React  from 'react'
import { useState } from 'react'
import mostrar from './../assets/icones/mostrar.png'
import esconder from './../assets/icones/esconder.png'

const FormField = ({tipo, title, value, placeholder, handleChangeText, otherStyles, ...props }) => {

    const [showPassword, setShowPassword] = useState (false)

  return (
    <View>
        <Text style={{marginLeft: 20, marginBottom: 5}}>{title}</Text>

        <View style={{flex: 1, flexDirection: 'row', borderWidth: 1, borderColor: '#000000', padding: 15, marginHorizontal: 20, marginBottom: 5, borderRadius: 15}}>
            <TextInput 
            style={{flex: 1}}
            value = {value}
            placeholder = {placeholder}
            onChangeText={handleChangeText}
            secureTextEntry={title === 'Senha' && !showPassword}
            keyboardType={tipo}
            />

            {title === 'Senha' && (
                <TouchableOpacity onPress={() =>
                    setShowPassword(!showPassword)}>
                        <Image style={{ height: 30, width: 30, }} source={!showPassword ? mostrar: esconder} />
                    </TouchableOpacity>
            )}

        </View>

    </View>
  )
}

export default FormField