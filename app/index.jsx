import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Redirect, router  } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import app from './../assets/images/App.png'
import Botaocustomizado from '../components/Botaocustomizado';
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {

  const {isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/inicio"/>

  return (
    <SafeAreaView>
      <ScrollView>
      <View style={{alignItems: 'center'}}>
        <Image source={app} style={styles.appImagem}/>
        <View style={{marginTop:-200}}>
          <Text style={{marginBottom:200}}>
            Central de pedidos grupo Brisa
          </Text>
        </View>
        <Botaocustomizado 
        title="Continuar com o email"
        handlePress={() => router.push('/logar')}
        />
      </View>
      </ScrollView>
      <StatusBar backgroundColor='#BD17A1' style='light'/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appImagem: {
    width: 300,
    height: 500,
    objectFit: 'contain',
    marginTop: 50
  }
});
