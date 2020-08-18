import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { AppContext } from './src/services/AppContext.js'
import App from './App'

export const AppProvider = () => {
	const [ loading, setLoading ] = useState(true)
	const [ user, setUser ] = useState(null)

	useEffect(() => {
		;(async () => {
			const jsonValue = await AsyncStorage.getItem('user')
			if (!jsonValue) {
				setLoading(false)
				return
			}
			setUser(JSON.parse(jsonValue))
			setLoading(false)
		})()
	}, [])

	if (loading) {
		return null
	}

	return (
		<AppContext.Provider value={{ user, setUser }}>
			<App />
		</AppContext.Provider>
	)
}
