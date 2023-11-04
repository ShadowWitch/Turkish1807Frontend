import React from "react";

import { Background } from "../../components/Background";
import { FormContrato } from "../../components/forms/FormContrato";
import { PropsWithNavigator } from "../../types/TypesNavigator";

export const ContratoScreen = ({ navigation, route }: PropsWithNavigator) => {
  return (
    <Background>
      <FormContrato navigation={navigation} route={route} />
    </Background>
  );
};
