import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Picker,
} from "react-native";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

function SellerComponent() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      idSeller: "",
      name: "",
      email: "",
      total: "",
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 20,
          minLength: 3,
          pattern: /^[A-Za-z]+$/i,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.inputs,
              {
                borderColor:
                  errors.user?.type == "required" ||
                  errors.user?.type == "pattern" ||
                  errors.user?.type == "minLength" ||
                  errors.user?.type == "maxLength"
                    ? "red"
                    : "#C4DDFF",
              },
            ]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Full Name ..."
          />
        )}
        name="idSeller"
      />

      {errors.user?.type == "required" && (
        <Text style={{ color: "red" }}>The user is required</Text>
      )}
      {errors.user?.type == "pattern" && (
        <Text style={{ color: "red" }}>Only letters</Text>
      )}
      {errors.user?.type == "maxLength" && (
        <Text style={{ color: "red" }}>Max 20 characters</Text>
      )}
      {errors.user?.type == "minLength" && (
        <Text style={{ color: "red" }}>Min 3 characters</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  images: {
    width: 170,
    height: 140,
  },
  inputs: {
    marginTop: 10,
    borderColor: "#C4DDFF",
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    color: "#C4DDFF",
  },
  button: {
    backgroundColor: "#47B5FF",
    width: "100%",
    borderRadius: 5,
    marginTop: 50,
    alignItems: "center",
    padding: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: 700,
  },
  select: {
    width: "100%",
    height: 35,
    borderColor: "#C4DDFF",
    color: "#C4DDFF",
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
  },
});

export default SellerComponent;
