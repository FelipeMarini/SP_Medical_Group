import React from 'react'
import { StyleSheet, Text, Image, View } from 'react-native'


function Header() {  // fazer modal do menu hamburger

    return (

        <View style={styles.header}>



            <Image
                source={require('../../assets/img/hamburger.png')}
                style={styles.hamburger}
            />

            <Text style={styles.headerText}>{'clínica sp medical group'.toUpperCase()}</Text>

            <Image
                source={require('../../assets/img/logo.png')}
                style={styles.logo}
            />

        </View>


    )

}

export default Header


const styles = StyleSheet.create({

    header: {
        width: '100%',
        height: 90,
        backgroundColor: '#a7eff5',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    hamburger: {
        width: 40,
        height: 40,
    },

    headerText: {
        fontFamily: 'Roboto',
        fontSize: 14,
        color: '#000',
        marginLeft: 25
    },

    logo: {
        width: 70,
        height: 74,
        marginLeft: 30
    }

})