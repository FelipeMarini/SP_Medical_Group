import React, { Component } from 'react'
import { StyleSheet, Text, Image, TextInput, View, TouchableOpacity, } from 'react-native'
import api from '../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwtDecode from 'jwt-decode'
import Header from '../components/header'



class Login extends Component {

    constructor(props) {

        super(props)

        this.state = {

            email: '',
            senha: '',
            role: ''

        }
    }


    RealizarLogin = async () => {

        console.warn('email:' + this.state.email + '/' + 'senha:' + this.state.senha)

        try {

            const resposta = await api.post('/login', {
                email: this.state.email,
                senha: this.state.senha
            })

            const token = resposta.data.token

            console.warn(token)

            await AsyncStorage.setItem('userToken', token)


            //redirecionamento das bottom tabs de acordo com usuário logado (médico ou paciente)
            const valorToken = await AsyncStorage.getItem('userToken')

            console.warn(jwtDecode(valorToken))

            if (valorToken !== null) {

                this.setState({ role: jwtDecode(valorToken).role })

                console.warn(this.state.role)

            }

            if (this.state.role == 2) { //ou this.state.role === '2' (estritamente igual) porque o JWT vem como string

                this.props.navigation.navigate('Med')

                console.warn('Indo para a bottom tab de médicos')

            }

            if (this.state.role == 3) { //ou this.state.role === '3' (estritamente igual) porque o JWT vem como string

                this.props.navigation.navigate('Pac')

                console.warn('Indo para a bottom tab de pacientes')

            }

        }

        catch (error) {

            console.warn(error)

        }

    }


    LimparCampos = () => {

        this.setState({ email: '', senha: '' })

    }


    componentDidMount() {

        this.LimparCampos() //necessário aqui para limpar os campos?

    }


    render() {

        return (

            <View style={styles.main}>


                <Header />


                <View style={styles.mainBody}>

                    <View style={styles.loginTitleBox}>
                        <Text style={styles.loginTitle}>{'login'.toUpperCase()}</Text>
                    </View>


                    <TextInput
                        style={styles.inputLogin}
                        onChangeText={email => this.setState({ email })}
                        placeholder='email'
                        placeholderTextColor='#000'
                        keyboardType='email-address'
                    />


                    <TextInput
                        style={styles.inputLogin}
                        onChangeText={senha => this.setState({ senha })}
                        placeholder='senha'
                        placeholderTextColor='#000'
                        keyboardType='default'
                        secureTextEntry={true}
                    />


                    <TouchableOpacity
                        style={styles.btnLogin}
                        onPress={this.RealizarLogin}
                    >

                        <View style={styles.btnLoginBox}>
                            <Text style={styles.btnLoginText}>{'entrar'.toUpperCase()}</Text>
                        </View>

                    </TouchableOpacity>


                </View>


            </View>

        )

    }



}

export default Login


const styles = StyleSheet.create({

    main: {
        flex: 1,
        backgroundColor: '#aefad0',
    },


    mainBody: {  //centraliza tudo na tela de login ;)
        justifyContent: 'center',
        alignItems: 'center'
    },

    loginTitleBox: {
        width: 300,
        height: 50,
        backgroundColor: '#99cbe8',
        borderRadius: 6,
        marginTop: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    loginTitle: {
        fontFamily: 'Roboto',
        fontSize: 36,
        color: '#000'
    },

    inputLogin: {
        width: 230,
        height: 36,
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
        marginTop: 50,
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 24,
    },

    btnLoginBox: {
        width: 200,
        height: 40,
        backgroundColor: '#0cf2a9',
        borderRadius: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 65
    },

    btnLoginText: {
        fontFamily: 'Roboto', //pensar em outra fonte talvez melhor
        fontSize: 18,
        //fontWeight: 400,
        color: '#000' //pensar em talvez outra cor também
    }


})
