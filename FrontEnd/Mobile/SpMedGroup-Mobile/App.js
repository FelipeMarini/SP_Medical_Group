import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './src/screens/home'
import Login from './src/screens/login'
import Med from './src/screens/med'
import Pac from './src/screens/pac'


const AuthStack = createStackNavigator() //ordem importa em AuthStack.Screen


function Stack() {

  return (

    <NavigationContainer>

      <AuthStack.Navigator
        headerMode='none'
      >

        <AuthStack.Screen name='Home' component={Home} />
        <AuthStack.Screen name='Login' component={Login} />
        <AuthStack.Screen name='Med' component={Med} />
        <AuthStack.Screen name='Pac' component={Pac} />

      </AuthStack.Navigator>

    </NavigationContainer>

  )

}


export default Stack


