import React, { Component } from 'react'
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'


import Header from '../components/header'


class Voltar extends Component {


    constructor(props) {

        super(props)

    }


    RealizarLogout = async () => {

        try {

            await AsyncStorage.removeItem('userToken')

            this.props.navigation.navigate('Home')

        }

        catch (error) {

            console.warn(error)

        }

    }


    render() {

        return (

            <View style={styles.container}>


                <Header />


                <View style={styles.mainBody}>

                    <Image
                        source={require('../../assets/img/medica-fundo.png')}
                        style={styles.homeImg}
                    />


                    <Text style={styles.homeText}>{'sp medical group'.toUpperCase()}</Text>


                    <TouchableOpacity
                        onPress={this.RealizarLogout}
                        style={styles.btnLogout}
                    >
                        <View style={styles.btnLogoutBox}>
                            <Text style={styles.btnLogoutText}>{'sair'.toUpperCase()}</Text>
                        </View>
                    </TouchableOpacity>


                </View>


            </View>

        )

    }
}


export default Voltar



const styles = StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: '#aefad0',
    },

    mainBody: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    homeImg: {
        width: 300,
        height: 300,
        marginTop: 20
    },

    homeText: {
        fontFamily: 'Roboto',
        fontSize: 18,
        marginTop: 25
    },

    btnLogout: {
        marginTop: 15,
    },

    btnLogoutBox: {
        width: 100,
        height: 20,
        borderRadius: 6,
        backgroundColor: '#b5aafa',
        textAlign: 'center',
    },

    btnLogoutText: {
        fontFamily: 'Roboto',
        fontSize: 16
    }

})
