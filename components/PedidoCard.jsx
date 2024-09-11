import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const PedidoCard = ( {pedidos: {quantidade, codigo, Descricao, valor, $createdAt, usuarios: {username, avatar}}}) => {
  
    const date = new Date($createdAt);
    //Horario do Brasil
    date.setHours(date.getHours() - 3);

    // Formatar como "DD/MM/YYYY"
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  
    return (
    <View style={styles.container}>
        <View style={{flex: 1, flexDirection: 'row', padding: 15}}>
            <View style={{borderWidth: 1, height: 30, width: 30, borderRadius: 15, marginRight: 10}}>
                <Image source={{uri: avatar}} style={{height: 28, width: 28, borderRadius: 15}}/>
            </View>
            <View style= {{flex: 1, justifyContent: 'center'}}>
                <Text>
                    {username}
                </Text>
            </View>
            <View style= {{flex: 1, justifyContent: 'center'}}>
                <Text>
                    {formattedDate}
                </Text>
            </View>
        </View>
        <View style={styles.card}>
            <View style={styles.colunas}>
                <Text>Qtd</Text>
                <Text>{quantidade}</Text>
            </View>
            <View style={styles.colunas}>
                <Text>Codigo</Text>
                <Text>{codigo}</Text>
            </View>
            <View style={styles.colunas}>
                <Text>Descricao</Text>
                <Text>{Descricao}</Text>
            </View>
            <View style={styles.colunas}>
                <Text>Valor (R$)</Text>
                <Text>{valor}</Text>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        elevation: 0,
        borderWidth: 1,
        marginBottom: 10,
        marginRight: 10,
        borderRadius: 15
    },
    card: {
        flex:1,
        flexDirection: 'row',
        padding: 10
    },
    colunas: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default PedidoCard