import { View, TextInput, TouchableOpacity, Image, Alert} from 'react-native'
import React  from 'react'
import { useState } from 'react'
import Lupa from './../assets/icones/Lupa.png'
import { usePathname, router } from 'expo-router';

const SearchInput = ({initialQuery}) => {

    const pathname = usePathname ()
    const [query, setQuery] = useState(initialQuery || '')
    console.log(query)
  return (


    <View style={{flex: 1, flexDirection: 'row', borderWidth: 1, borderColor: '#000000', padding: 15, marginHorizontal: 20, marginVertical: 15, borderRadius: 15}}>
        <TextInput 
        style={{flex: 1}}
        value = {query}
        placeholder = 'Buscar pedidos'
        onChangeText={(e) => setQuery(e)}
        />

        <TouchableOpacity
        onPress={() => {
          if(!query) {
            return Alert.alert('Missing query','Por favor insira algo para buscar' )
          }
          if(pathname.startsWith ('/search')) router.setParams({query});
            else router.push(`/search/${query}`)
        }}
        >
            <Image source={Lupa} style={{ flex: 1, height: 20, width: 30}}/>
        </TouchableOpacity>
    </View>
  )
}

export default SearchInput