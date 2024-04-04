import { StyleSheet, View } from "react-native";
import React, { ReactNode } from "react";
import {
  ERROR_INTERCEPTOR_INITIAL_STATE,
  setErrorInterceptor,
  useDispatch,
  useSelector,
} from "../redux";
import { ErrorModal } from "../components";

interface RequestErrorInterceptorProps {
  children: ReactNode;
}

const RequestErrorInterceptor = ({
  children,
}: RequestErrorInterceptorProps) => {
  const { code, text } = useSelector((state) => state.errorInterceptor);

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <ErrorModal
        onClose={() =>
          dispatch(setErrorInterceptor(ERROR_INTERCEPTOR_INITIAL_STATE))
        }
        visible={Boolean(text)}
        code={code}
        text={text}
      />

      {children}
    </View>
  );
};

export default RequestErrorInterceptor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
