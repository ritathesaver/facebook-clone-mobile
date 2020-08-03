import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

export const AppContext = React.createContext({
	user: null,
	setUser: () => {}
})
