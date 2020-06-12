import React, { useState } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import {
	Alert,
	ScrollView,
	Text,
	View,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import {
	FormTextInput,
	FormImageInput,
	NavBar,
	LinkButton,
	SpacerInline,
	Title,
} from '@elements';
import useGlobal from '@state';
import * as colors from '@util/colors';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import styles from './RegistrationScreen.styles';

export default () => {
	const { navigate } = useNavigation();
	const [_state, actions] = useGlobal() as any;
	const { register } = actions;

	const [city, setCity] = useState('');
	const [email, setEmail] = useState('');
	const [image, setImage] = useState({} as ImageInfo);
	const [license, setLicense] = useState('');
	const [organizationName, setOrganizationName] = useState('');
	const [password, setPassword] = useState('');
	const [street, setStreet] = useState('');
	const [state, _setState] = useState('WA');
	const [termsOfService, setTermsOfService] = useState(false);
	const [zip, setZip] = useState('');

	const toggleTermsOfService = () => setTermsOfService(!termsOfService);

	const validateAndSubmit = async () => {
		if (organizationName === '') { Alert.alert("Please add your organization's name."); return; }
		if (!email.includes('@') || !email.includes('.')) { Alert.alert('Please enter a valid email address.'); return; }
		if (password.length < 8) { Alert.alert('Please enter a password at least 8 characters long.'); return; }
		if (license.length !== 9) { Alert.alert('Please enter your 9-digit UBI with no spaces or dashes.'); return; }
		if (!image) { Alert.alert('Please add an image of your business license to continue.'); return; }
		if (!street || street.split(' ').length < 3) { Alert.alert('Please enter your street number and name.'); return; }
		if (!city) { Alert.alert('Please enter your city.'); return; }
		if (!(/^\d{5}$/.test(zip))) { Alert.alert('Please enter a valid 5-digit zip code.'); return; }
		if (!termsOfService) { Alert.alert('Please read and accept the terms of service to complete your registration.'); return; }

		const statusCode = await register({
			organizationName, email, password, license, street, city, state, zip, termsOfService,
		});
		switch (statusCode) {
			case (201 || 202): Alert.alert('Registration complete! Please log in to continue.'); navigate('LoginScreen', { email, password }); return;
			case 406: Alert.alert('Error: not accepted'); return;
			case 500: Alert.alert('Internal server error, please try again later.'); return;
			default: Alert.alert("Sorry, that didn't work, please try again later."); console.log(statusCode);
		}
	};


	return (
		<ScrollView contentContainerStyle={styles.outerContainer}>
			<View>
				<NavBar showMenu={false} />
				<Title text="Registration." />
				<Text style={styles.text}>
					Please add your business's details below.  You will be able to update them once registration is complete.
				</Text>
				<FormTextInput
					label="Organization Name"
					value={organizationName}
					setValue={setOrganizationName}
				/>

				<FormTextInput
					label="Email Address"
					value={email}
					setValue={setEmail}
				/>

				<FormTextInput
					label="Password"
					value={password}
					setValue={setPassword}
				/>

				<FormTextInput
					label="WA State UBI (Business License No.)"
					value={license}
					setValue={setLicense}
				/>

				<FormImageInput
					label="Business License Verification"
					value={image}
					setValue={setImage}
					status={image?.uri ? 'success' : 'none'}
				/>

				<FormTextInput
					label="Street Address"
					value={street}
					setValue={setStreet}
					autoCapitalize="words"
				/>

				<View style={styles.row}>
					<FormTextInput
						label="City"
						value={city}
						setValue={setCity}
						style={{ width: '40%' }}
						autoCapitalize="words"
					/>
					<FormTextInput
						label="State"
						value={state}
						setValue={() => { }}
						style={{ width: '15%' }}
						autoCapitalize="words"
					/>
					<FormTextInput
						label="Zip"
						value={zip}
						setValue={setZip}
						style={{ width: '35%' }}
						autoCapitalize="words"
					/>
				</View>

				<View style={styles.checkboxRow}>
					<View style={styles.checkBox}>
						<Checkbox
							status={termsOfService ? 'checked' : 'unchecked'}
							onPress={toggleTermsOfService}
							color={colors.NAVY_BLUE}
							uncheckedColor="white"
						/>
					</View>
					<SpacerInline width={10} />
					<Text
						style={styles.text}
						onPress={toggleTermsOfService}
					>
						Accept
					</Text>
					<SpacerInline width={10} />
					<View style={{ top: 11 }}>
						<LinkButton
							text="Terms of Service"
							destination="TermsScreen"
						/>
					</View>
				</View>
			</View>


			<View>
				<SpacerInline height={15} />
				<LinkButton
					text="Register"
					onPress={validateAndSubmit}
				/>
				<SpacerInline height={40} />
			</View>
		</ScrollView>
	);
};

