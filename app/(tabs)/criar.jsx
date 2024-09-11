import { View, Text, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import Botaocustomizado from '../../components/Botaocustomizado'
import { router } from 'expo-router'
import { createOrder } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const Create = () => {

  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    quantidade: '',
    codigo: null,
    Descricao: '',
    valor: null
  })

  const submit = async () => {
    if(!form.quantidade || !form.codigo || !form.Descricao || !form.valor) {
      Alert.alert('Por favor preenxa todos os campos')
    }

    setUploading(true)

    try {
      await createOrder({
        ...form, userId: user.$id
      })


      Alert.alert('Pedido enviado!', 'Pedido enviado com sucesso :)')
      router.push('/inicio')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally{
      setForm({
      quantidade: '',
      codigo: '',
      Descricao: '',
      valor: ''
    })

    setUploading(false)
    }
  }
  return (
    <SafeAreaView style={{}}>
      <ScrollView>
        <Text style={{marginLeft: 20, marginTop: 20, fontSize: 20, marginBottom: 20}}>
          Criar pedido
        </Text>
        <FormField
        title="quantidade do item pedido"
        value={form.quantidade}
        placeholder="quantidade do item pedido"
        handleChangeText={(e) => setForm({...form, quantidade: e})}
        tipo='numeric'
        />
        <FormField
        title="Codigo do item pedido"
        value={form.codigo}
        placeholder="Insira o codigo do item pedido"
        handleChangeText={(e) => setForm({...form, codigo: e})}
        tipo='numeric'
        />
        <FormField
        title="Nome do produto"
        value={form.Descricao}
        placeholder="Insira o nome do produto"
        handleChangeText={(e) => setForm({...form, Descricao: e})}
        />
        <FormField
        title="Valor do produto em reais"
        value={form.valor}
        placeholder="Insira o valor do produto em reais"
        handleChangeText={(e) => setForm({...form, valor: e})}
        tipo='numeric'
        />
        <Botaocustomizado
        title= 'Enviar'
        handlePress={submit}
        isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create