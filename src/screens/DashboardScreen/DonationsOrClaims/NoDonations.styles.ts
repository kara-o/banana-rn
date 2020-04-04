import { StyleSheet } from 'react-native';
import * as colors from '@util/colors';

export default StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.LIGHT_YELLOW,
		padding: 20
	},
	text: {
		fontFamily: 'open-sans-bold',
		fontSize: 20,
		color: colors.NAVY_BLUE,
		textAlign: 'center'
	}
});
