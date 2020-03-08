import React, { FunctionComponent, ReactChild } from 'react';
import { View } from 'react-native';
import { Title, LinkButton, SpacerInline, Header } from '@elements';
import styles from './InfoScreen.styles';

type InfoScreenProps = {
  title: string;
  nextScreenTitle?: string;
  nextScreenDestination?: string;
  backDestination?: string;
};

const InfoScreen: FunctionComponent<InfoScreenProps> = ({
  title,
  nextScreenTitle,
  nextScreenDestination,
  children
}) => (
  <View style={styles.outerContainer}>
    <View>
      <Header showMenu={false} showBackButton={false} />
      <Title text={title} />
      <SpacerInline height={40} />
      <View>{children}</View>
    </View>

    <View>
      {nextScreenTitle && nextScreenDestination && (
        <LinkButton
          text={nextScreenTitle}
          destination={nextScreenDestination}
        />
      )}
      <SpacerInline height={40} />
    </View>
  </View>
);

export default InfoScreen;
