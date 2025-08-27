import React from 'react'
import { Image, StyleSheet } from 'react-native'
import Pdf from 'react-native-pdf';

export default function Libreta2() {
	const source = require('http://localhost:3000/public/libreta_80980350201217250_2022.pdf');
	//./
	return <Pdf source={source} style={styles.pdf} />
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	pdf: {
		flex: 1,
		width: Dimensions.get('window').width,
	},
})
