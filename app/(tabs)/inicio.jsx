import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Brisa from './../../assets/images/Brisa.jpg'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import PedidoCard from '../../components/PedidoCard'
import { useGlobalContext } from '../../context/GlobalProvider'


const Home = () => {

  const {data: posts, refetch, } = useAppwrite(getAllPosts);
  const [refreshing, setRefreshing] = useState(false)
  const {user, setUser, setIsLoggedIn} = useGlobalContext();
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

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
              <View style={{flex: 1, justifyContent: 'center', marginTop: 20}}>
                <Text>
                  Bem vindo outra vez,
                </Text>
                <Text>
                  {user?.username}
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 30, marginRight: 20, marginTop: 20}}>Brisa</Text>
              </View>
            </View>
            <SearchInput/>
            <View>
              <Text style={{marginBottom: 15, fontSize: 17}}>
                Pedidos enviados:
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
          title='Nenhum pedido encontrado'
          subtitle='Nenhum pedido criado ainda'
          />
        )}
        refreshControl={<RefreshControl refreshing = {refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Home