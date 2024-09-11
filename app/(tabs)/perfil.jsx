import { View, Text, FlatList, Image, TouchableOpacity, RefreshControl } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/EmptyState'
import { getUserPosts, signOut } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import PedidoCard from '../../components/PedidoCard'
import { useGlobalContext } from './../../context/GlobalProvider'
import InfoBox from '../../components/InfoBox'
import { router } from 'expo-router'


const Perfil = () => {

  const {user, setUser, setIsLoggedIn} = useGlobalContext();
  const {data: posts, refetch} = useAppwrite( () => getUserPosts(user.$id));
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  const logout = async () => {
    await signOut();
    setUser(null)
    setIsLoggedIn(false)

    router.replace('/logar')
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
          <View style={{flex:1, marginVertical: 50 , marginRight: 30, width: '90%', alignSelf: 'flex-end'}}>
            
            <TouchableOpacity style={{flex: 0.1, alignSelf: 'flex-end'}} onPress={logout}>
              <Text style={{flex: 1, alignSelf: 'flex-start'}}>Sair</Text>
            </TouchableOpacity>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Image source={{uri: user?.avatar}} style={{height: 50, width: 50, borderRadius: 25}}/>
            </View >
            <View style={{flex: 1, alignItems: 'center'}}>
            <InfoBox 
            title = {user?.username}
            />
            
              <InfoBox 
              title = {posts.length || 0}
              subtitle={'Total de pedidos:'}
              />
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

export default Perfil