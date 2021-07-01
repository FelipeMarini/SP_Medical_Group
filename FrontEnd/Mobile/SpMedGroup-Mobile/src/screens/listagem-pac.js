import React, { Component } from 'react'
import { StyleSheet, Image, Text, View, FlatList, TouchableOpacity, } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../services/api'

import Header from '../components/header'



class Paciente extends Component {

    constructor(props) {

        super(props)

        this.state = {

            listaConsultasPac: []

        }

    }


    BuscarConsultasPaciente = async () => {


        const valorToken = await AsyncStorage.getItem('userToken')

        const resposta = await api.get('/consultas/paclist', {

            headers: {
                'Authorization': 'Bearer ' + valorToken
            }

        })

        const dadosDaApi = resposta.data

        this.setState({ listaConsultasPac: dadosDaApi })

    }


    LimparListaPac = () => {

        this.setState({ listaConsultasPac: [] })

    }



    componentDidMount() {

    }


    render() {

        return (

            <View style={styles.main}>


                <Header />


                <View style={styles.mainBody}>


                    <View style={styles.flexBtns}>

                        <View style={styles.consultasTitleBox}>
                            <Text style={styles.consultasTitle}>{'agenda - paciente'.toUpperCase()}</Text>
                        </View>



                    </View>


                    <TouchableOpacity
                        onPress={this.BuscarConsultasPaciente}
                        style={styles.consultasBtn}
                    >

                        <View style={styles.consultasBtnBox}>
                            <Text style={styles.consultasBtnText}>{'ver consultas'.toUpperCase()}</Text>
                        </View>

                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={this.LimparListaPac}
                        style={styles.consultasBtn}
                    >

                        <View style={styles.consultasBtnBox}>
                            <Text style={styles.consultasBtnText}>{'limpar lista'.toUpperCase()}</Text>
                        </View>

                    </TouchableOpacity>



                    <View style={styles.listaConsultasBox}>

                        <FlatList
                            contentContainerStyle={styles.mainListContent}
                            data={this.state.listaConsultasPac}
                            keyExtractor={item => item.idConsulta} //talvez tenha que alterar aqui pra funfar
                            renderItem={this.renderItem}
                        />

                    </View>

                </View>


            </View>

        )

    }

    renderItem = ({ item }) => (

        <View style={styles.flatItemRow}>

            <View style={styles.flatItemContainer}>

                <Text style={styles.flatItemInfo}>Data da Consulta: {Intl.DateTimeFormat('pt-BR').format(new Date(item.dataConsulta))}</Text>
                <Text style={styles.flatItemInfo}>Médico(a): {item.idMedicoNavigation.nomeMedico} </Text>
                <Text style={styles.flatItemInfo}>Situação da Consulta: {item.idSituacaoNavigation.descricaoSituacao} </Text>

            </View>

            <View style={styles.flexDescricao}>

                <Text style={styles.flatItemDescricao}>Descrição: {item.descricao}</Text>

                <Image
                    source={require('../../assets/img/view.png')}
                    style={styles.flatItemImg}
                />

            </View>

        </View>

    )

}

export default Paciente


const styles = StyleSheet.create({

    main: {
        flex: 1,
        backgroundColor: '#aefad0',
    },


    flexBtns: {
        alignItems: 'center'
    },

    consultasTitleBox: {
        width: '50%',
        height: 40,
        backgroundColor: '#68e8e2',
        borderRadius: 5,
        marginTop: 15,
        marginLeft: '25%',
        marginRight: '25%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    consultasTitle: {
        fontFamily: 'Roboto',
        fontSize: 18
    },


    consultasBtn: {
        width: '40%',
        height: 30,
        marginTop: 15,
        marginLeft: '30%',
        marginRight: '30%',
    },

    consultasBtnBox: {
        width: '100%',
        height: '100%',
        backgroundColor: '#6edb97',
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    consultasBtnText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#fff'
    },


    // INÍCIO DA ESTILIZAÇÃO DA LISTA

    listaConsultasBox: {
        width: '80%',
        height: 'auto',
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
        marginTop: 15,
        marginLeft: '10%',
        marginRight: '10%'
    },

    flatItemRow: {
        borderBottomWidth: 2,
        borderColor: '#000',
        marginTop: 10
    },

    flatItemContainer: {
        flex: 1
    },

    flatItemInfo: {
        lineHeight: 25
    },

    flatItemImg: {
        width: 16,
        height: 16,
        tintColor: 'green',
        marginTop: 8,
        marginBottom: 3,
        marginLeft: 15
    },

    flexDescricao: {
        flexDirection: 'row',
    },

    flatItemDescricao: {
        marginTop: 6
    }


})