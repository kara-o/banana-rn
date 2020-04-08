import React from 'react'
import { View, Image, Text } from 'react-native';
import { SpacerInline } from '@elements'
import useGlobal from '@state';
import styles from './NoDonations.styles'

const NoDonations = () => {
  const [ state ] = useGlobal();
  const { userIdentity } = state;
  return (
    <View style={styles.container}>
    { userIdentity === 'donor' ? (
      <>
      <Image source={require('@assets/images/banana1.png')} />
      <SpacerInline height={40}/>
      <Text style={styles.text}>{("You currently don't have any donations.").toUpperCase()}</Text>
      </>
    ) : (
      <>
      <Text style={styles.text}>{("No available donations near you.").toUpperCase()}</Text>
      <SpacerInline height={40}/>
      <Image source={require('@assets/images/banana1.png')} />
      <SpacerInline height={40}/>
      <Text style={styles.text}>
        {("We will notify you when new donations are available.").toUpperCase()}
        {"\n"}
        {("OR").toUpperCase()}
        {"\n"}
        {("Please check back later.").toUpperCase()}
      </Text>
      </>
    )}
    </View>
  )
}

export default NoDonations

    
