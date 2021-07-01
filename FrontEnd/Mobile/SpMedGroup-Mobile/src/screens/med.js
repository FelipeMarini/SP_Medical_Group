import React, { Component } from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Voltar from './voltar'
import Médico from './listagem-med'



const bottomTab = createBottomTabNavigator()



class Med extends Component {


    render() {

        return (

            <View style={styles.main}>

                <bottomTab.Navigator

                    initialRouteName='Voltar'

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


                            if (route.name === 'Voltar') {
                                return (
                                    <Image
                                        style={styles.tabBarIcon}
                                        source={require('../../assets/img/house.png')}
                                    />
                                )
                            }

                            if (route.name === 'Médico') {
                                return (
                                    <Image
                                        style={styles.tabBarIcon}
                                        source={require('../../assets/img/ambulance.png')}
                                    />
                                )
                            }
                        }

                    })}
                >

                    <bottomTab.Screen name='Voltar' component={Voltar} />
                    <bottomTab.Screen name='Médico' component={Médico} />

                </bottomTab.Navigator>







            </View>



        )

    }

}

export default Med


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