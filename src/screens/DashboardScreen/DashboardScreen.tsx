import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useGlobal from '@state';
import { Title, SpacerInline, Header } from '@elements';
import DonationsOrClaims from './DonationsOrClaims';
import styles from './DashboardScreen.styles';

const DashboardScreen = () => {
	const { navigate } = useNavigation();
	const [ state ] = useGlobal();
	const { userIdentity } = state;

	return (
		<View style={styles.outerContainer}>
			<View>
				<Header showBackButton={false} />
				<SpacerInline height={20} />
				<Title text='Donations' />
				<SpacerInline height={20} />
			</View>

			<DonationsOrClaims resource="donations" />

			{ userIdentity === 'donor' && (
				<View style={styles.addButton}>
					<TouchableOpacity
						onPress={() => navigate('DonationScreen', {})}
					>
						<Text style={styles.plus}>
							+
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};

export default DashboardScreen;
