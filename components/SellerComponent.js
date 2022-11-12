import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Picker,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

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

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [complete, setComplete] = useState(false);

  const getSellers = async () => {
    try {
      const url = `http://192.168.1.6:3000/api/sellers`;
      const response = await axios.get(url);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getSellersId = async (data) => {
    setLoading(true);
    setComplete(true);
    reset();
    try {
      const url = `http://192.168.1.6:3000/api/sellers/${data.idSeller}`;
      const response = await axios.get(url);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResult = (data) => {
    return (
      <View style={{ marginTop: 20 }}>
        <Text key={data._id} style={styles.text}>
          IdSeller: {data._id}
        </Text>
        <Text key={data.name} style={styles.text}>
          Name: {data.name}
        </Text>
        <Text key={data.email} style={styles.text}>
          Email: {data.email}
        </Text>
        <Text key={data.totalCommission} style={styles.text}>
          Total Commissions: {data.totalCommission}
        </Text>
      </View>
    );
  };

  useEffect(() => {
    getSellers();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          display: !complete ? "flex" : "none",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View style={styles.content}>
          <Controller
            control={control}
            rules={{
              minLength: 2,
              pattern: /^[0-9a-z]+$/i,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.inputs,
                  {
                    borderColor:
                      errors.idSeller?.type == "required" ||
                      errors.idSeller?.type == "pattern" ||
                      errors.idSeller?.type == "minLength" ||
                      errors.idSeller?.type == "maxLength"
                        ? "red"
                        : "#8E05C2",
                  },
                ]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Id Seller"
              />
            )}
            name="idSeller"
          />

          {errors.idSeller?.type == "required" && (
            <Text style={{ color: "red" }}>The idSeller is required</Text>
          )}
          {errors.idSeller?.type == "pattern" && (
            <Text style={{ color: "red" }}>Only numbers</Text>
          )}
          {errors.idSeller?.type == "minLength" && (
            <Text style={{ color: "red" }}>Min 2 characters</Text>
          )}

          <Controller
            control={control}
            rules={{
              minLength: 2,
              pattern: /^[A-Za-z\s]+$/g,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.inputs,
                  {
                    borderColor:
                      errors.name?.type == "required" ||
                      errors.name?.type == "pattern" ||
                      errors.name?.type == "minLength"
                        ? "red"
                        : "#8E05C2",
                  },
                ]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Name"
              />
            )}
            name="name"
          />

          {errors.name?.type == "required" && (
            <Text style={{ color: "red" }}>The name is required</Text>
          )}
          {errors.name?.type == "pattern" && (
            <Text style={{ color: "red" }}>Only letters</Text>
          )}
          {errors.name?.type == "minLength" && (
            <Text style={{ color: "red" }}>Min 2 characters</Text>
          )}
          <Controller
            control={control}
            rules={{
              minLength: 5,
              pattern: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.inputs,
                  {
                    borderColor:
                      errors.email?.type == "required" ||
                      errors.email?.type == "pattern" ||
                      errors.email?.type == "minLength"
                        ? "red"
                        : "#8E05C2",
                  },
                ]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Email"
              />
            )}
            name="email"
          />

          {errors.email?.type == "required" && (
            <Text style={{ color: "red" }}>The email is required</Text>
          )}
          {errors.email?.type == "pattern" && (
            <Text style={{ color: "red" }}>Only email</Text>
          )}
          {errors.email?.type == "minLength" && (
            <Text style={{ color: "red" }}>Min 5 characters</Text>
          )}
          <Controller
            control={control}
            rules={{
              minLength: 2,
              pattern: /^[0-9]+$/i,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.inputs,
                  {
                    borderColor:
                      errors.total?.type == "required" ||
                      errors.total?.type == "pattern" ||
                      errors.total?.type == "minLength"
                        ? "red"
                        : "#8E05C2",
                  },
                ]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Total Commisions"
              />
            )}
            name="total"
          />

          {errors.total?.type == "required" && (
            <Text style={{ color: "red" }}>The total is required</Text>
          )}
          {errors.total?.type == "pattern" && (
            <Text style={{ color: "red" }}>Only numbers</Text>
          )}
          {errors.total?.type == "minLength" && (
            <Text style={{ color: "red" }}>Min 2 characters</Text>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(getSellersId)}
          >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          display: complete ? "flex" : "none",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Text>¡Request made successfully!</Text>
        {handleResult(data)}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setComplete(!complete)}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B2430",
    alignItems: "center",
    justifyContent: "center",
  },
  inputs: {
    marginTop: 10,
    borderBottomColor: "#8E05C2",
    borderBottomWidth: 2,
    padding: 5,
    color: "#fff",
  },
  button: {
    backgroundColor: "#8E05C2",
    width: "100%",
    borderRadius: 20,
    marginTop: 50,
    alignItems: "center",
    padding: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: 700,
  },
  content: {
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
  },
});

export default SellerComponent;
