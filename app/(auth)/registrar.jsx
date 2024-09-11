import { View, Text, ScrollView, Image, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import Botaocustomizado from '../../components/Botaocustomizado'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from "../../context/GlobalProvider";

const Registrar = () => {

  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [form, setForm] = useState({
    username: '',
    email:'',
    password:''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  //Criando conta e logando automaticamente com appwrite

  const submit = async () => {
    if(!form.username === "" || !form.email === "" || !form.password === "") {
      Alert.alert('Error', 'Por favor preencha todos os campos')
    }
    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLoggedIn(true);

      // set it to global state

      router.replace('/inicio')

    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
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
          title="Nome de usuario"
          value={form.username}
          handleChangeText={(e) => setForm({...form, username: e})}
          />
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
          keyBoardType="Password"
          />

          <Botaocustomizado
          title="Criar conta"
          handlePress={submit}
          isLoading={isSubmitting}
          />
          <View style= {{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{marginRight: 10}}>
              Ja possui uma conta?
            </Text>
            <Link href="/logar">Logar</Link>
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

export default Registrar