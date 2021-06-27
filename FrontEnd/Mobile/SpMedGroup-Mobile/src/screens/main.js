import React, { Component } from 'react'
import { StyleSheet, Image, View } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import jwtDecode from 'jwt-decode'

import Médico from './listagem-med'
import Paciente from './listagem-pac'


const bottomTab = createBottomTabNavigator()


class Main extends Component {

    render() {

        return (

            <View style={styles.main}>

                <bottomTab.Navigator

                    initialRouteName='Home'

                    tabBarOptions={{
                        showLabel: true,
                        showIcon: true,
                        activeBackgroundColor: '#0cf2a9',
                        inactiveBackgroundColor: '#f1f1f1',
                        activeTintColor: '#000',
                        inactiveTintColor: 'green',
                        style: {
                            height: 50
                        }
                    }}

                    screenOptions={({ route }) => ({

                        tabBarIcon: () => {

                            if (route.name === 'Médico') {
                                return (
                                    <Image
                                        style={styles.tabBarIcon}
                                        source={require('../../assets/img/ambulance.png')}
                                    />
                                )
                            }

                            if (route.name === 'Paciente') {
                                return (
                                    <Image
                                        style={styles.tabBarIcon}
                                        source={require('../../assets/img/search.png')}
                                    />
                                )
                            }
                        }

                    })}
                >

                    <bottomTab.Screen name='Médico' component={Médico} />
                    <bottomTab.Screen name='Paciente' component={Paciente} />

                </bottomTab.Navigator>

            </View>

        )

    }

}

export default Main


const styles = StyleSheet.create({

    main: {
        flex: 1,
        backgroundColor: '#f1f1f1'
    },

    tabBarIcon: {
        width: 26,
        height: 26
    }

})