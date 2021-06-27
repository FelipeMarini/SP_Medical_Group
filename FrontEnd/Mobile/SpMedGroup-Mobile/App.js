import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './src/screens/home'
import Login from './src/screens/login'
import Main from './src/screens/main'


const AuthStack = createStackNavigator() //ordem importa em AuthStack.Screen


function Stack() {

  return (

    <NavigationContainer>

      <AuthStack.Navigator
        headerMode='none'
      >

        <AuthStack.Screen name='Home' component={Home} />
        <AuthStack.Screen name='Login' component={Login} />
        <AuthStack.Screen name='Main' component={Main} />

      </AuthStack.Navigator>

    </NavigationContainer>

  )

}


export default Stack


