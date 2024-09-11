import { Tabs, } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AntDesign } from '@expo/vector-icons';


const TabsLayout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen 
        name="inicio"
        options={{
          tabBarIcon:({color,size}) => (
            <Entypo name="home" size={size} color={color} />
          ),
          headerShown: false,
        }}
        />
        <Tabs.Screen 
        name="criar"
        options={{
          tabBarIcon:({color,size}) => (
            <MaterialIcons name="create" size={size} color={color} />
          ),
          headerShown: false,
        title: 'Criar pedido'
        }}
        />
        <Tabs.Screen 
        name="perfil"
        options={{
          tabBarIcon:({color,size}) => (
            <AntDesign name="user" size={24} color={color} />
          ),
          headerShown: false,
        }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout