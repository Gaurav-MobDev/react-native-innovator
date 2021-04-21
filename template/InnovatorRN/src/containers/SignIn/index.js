import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity, View, SafeAreaView } from "react-native";
import Style from "./style";
import CTextBox from "../../components/CTextBox";
import CButton from "../../components/CButton";
import CLabel from "../../components/CLabel";
import { strings } from "../../locales/i18n";
import { loginAPI, loginSuccess, loginFailure } from "./slice";
import { testIds } from "../../constants/appConstants";
import { screenNames } from "../../navigation/navigationConstants";
import config from "../../config";
import { apiResponseTypes } from "../../utilities/Constants";
import { navigate } from "../../navigation/NavigationService";

const {
  login: { rejected, fulfilled },
} = apiResponseTypes;
const SignIn = () => {
  const { loginDetails } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [loading, setLoader] = useState(false);
  const [loginDetailsLocal, setLoginDetails] = useState(loginDetails);
  const onSignInPress = () => {
    setLoader(true);
    let data = {
      email: "dinesh@gmail.com",
      passwordLogin: "Admin1",
    };
    dispatch(loginAPI(data))
      .then(({ type, payload, error }) => {
        if (type === rejected) {
          setLoader(false);
          loginFailure(error);
          navigate(screenNames.Dashboard);
          return;
        }
        if (type === fulfilled) {
          loginSuccess(payload);
          navigate(screenNames.Dashboard);
        }
      })
      .catch((error) => alert(error));
  };
  const onSignUpPress = () => {
    navigate(screenNames.SignUp);
  };
  return (
    <SafeAreaView style={Style.screen}>
      <CLabel
        style={Style.bottomLabelStyle}
        text={`API_BASE_URL: ${config.API_BASE_URL}`}
        testID={testIds.abiBaseURL}
      />
      <View style={Style.all}>
        <CTextBox
          placeHolderText={strings("signIn.email")}
          onChangeText={(value) => {}}
          leftIcon="envelope-o"
          keyboardType="email-address"
        />
        <CTextBox
          placeHolderText={strings("signIn.password")}
          onChangeText={(value) => {}}
          leftIcon="lock"
          hidePassword={true}
        />
        <CButton onPress={onSignInPress} text={strings("signIn.signIn")} />
      </View>
      <View style={Style.footer}>
        <CLabel
          style={Style.bottomLabelStyle}
          text={strings("signIn.bottomText")}
        />
        <TouchableOpacity
          style={{ alignSelf: "center" }}
          onPress={onSignUpPress}
        >
          <CLabel
            style={{ color: "#0000EE", marginLeft: 5 }}
            text={strings("signIn.bottomText2")}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
