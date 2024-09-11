import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import Botaocustomizado from '../../components/Botaocustomizado'
import { Link } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from 'expo-router'

const Logar = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    
    email:'',
    password:'',
  })

  // Logando com appwrite

  const submit = async () => {
    if(!form.email === "" || !form.password === "") {
      Alert.alert('Error', 'Por favor preencha todos os campos')
    }
    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      Alert.alert("Success", "Usuario logado corretamente")

      // set it to global state

      router.replace('/inicio')

    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{flex: 1}}>
          <Text style={styles.imageStyle}>Grupo Brisa</Text>
          <Text style={styles.imageStyle}>Pedidos</Text>
          <Text style={{marginLeft: 20, marginBottom: 20, fontWeight: 'bold', fontSize: 17}}>Logar</Text>
          <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({...form, email: e})}
          keyBoardType="email-address"
          />
          <FormField
          title="Senha"
          value={form.password}
          handleChangeText={(e) => setForm({...form, password: e})}
          keyBoardType="email-address"
          />

          <Botaocustomizado
          title="Logar"
          handlePress={submit}
          isLoading={isSubmitting}
          />
          <View style= {{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{marginRight: 10}}>
              Nao possui conta?
            </Text>
            <Link href="/registrar">Criar conta</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  imageStyle: {
    flex: 1,
    fontSize: 50,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  }
})

export default Logar