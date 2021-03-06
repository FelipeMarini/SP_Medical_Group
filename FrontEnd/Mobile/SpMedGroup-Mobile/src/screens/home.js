import React, { Component } from 'react'
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'


import Header from '../components/header'


class Home extends Component {


    constructor(props) {

        super(props)

    }


    render() {

        return (

            <View style={styles.container}>


                <Header />


                <View style={styles.mainBody}>

                    <Image
                        source={require('../../assets/img/home-img.png')}
                        style={styles.homeImg}
                    />


                    <Text style={styles.homeText}>{'sp medical group'.toUpperCase()}</Text>


                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Login')}
                    >

                        <View style={styles.linkLogin}>

                            <Text style={styles.linkLoginText}>{'login'.toUpperCase()}</Text>

                        </View>

                    </TouchableOpacity>


                </View>


            </View>

        )

    }
}


export default Home



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

    linkLogin: {
        width: 200,
        height: 40,
        backgroundColor: '#a2c4fa',
        borderRadius: 6,
        marginTop: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    linkLoginText: {
        fontFamily: 'Roboto',
        fontSize: 18,
        fontWeight: "700"
    }

})
