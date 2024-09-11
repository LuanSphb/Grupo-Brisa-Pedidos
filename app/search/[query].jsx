import { View, Text, FlatList, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Brisa from './../../assets/images/Brisa.jpg'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { searchPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import PedidoCard from '../../components/PedidoCard'
import { useLocalSearchParams } from 'expo-router'


const Search = () => {

  const { query } = useLocalSearchParams();
  const {data: posts, refetch } = useAppwrite( () => searchPosts(query));

  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    refetch();
  }, [query]);

  console.log(query, posts)

  return (
    <SafeAreaView style={{flex:1, flexDirection: 'row'}}>
      <FlatList
        style={{marginLeft: 15}}
        data ={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <PedidoCard pedidos={item}/>
        )}
        ListHeaderComponent={() => (
          <View>
            <View style={{flex:1, flexDirection: 'row'}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text>
                  Resultados da busca:
                </Text>
                <Text>
                  {query}
                </Text>
                <SearchInput initialQuery={query} refetch={refetch}/>
              </View>
              <View>
                <Image source={Brisa} style={{flex: 1, height:50, width: 45, marginRight: 30, marginTop: 30}}/>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
          title='Nenhum pedido encontrado'
          subtitle='Nenhum pedido criado ainda'
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Search