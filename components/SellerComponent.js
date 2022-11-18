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
      totalCommission: "",
    },
  });

  const [data, setData] = useState([]);
  const [complete, setComplete] = useState(false);
  const [msgGood, setMsgGood] = useState("");
  const [msgBad, setMsgBad] = useState("");

  const getSellers = async () => {
    try {
      const url = `http://172.16.61.225:3000/api/sellers`;
      const response = await axios.get(url);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      setMsgBad(error);
    }
  };

  const getSellersId = async (data) => {
    let idSeller = data.idSeller;
    if (!idSeller.trim()) {
      setMsgBad("Invalid fields");
    } else {
      setComplete(true);
      reset();
      try {
        const url = `http://172.16.61.225:3000/api/sellers/${data.idSeller}`;
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setMsgBad(error);
      }
    }
  };

  const saveSeller = async (data) => {
    let idSeller = data.idSeller,
      name = data.name,
      email = data.email,
      totalCommission = data.totalCommission;
    if (
      !name.trim() ||
      !email.trim() ||
      !totalCommission.trim() ||
      !idSeller.trim()
    ) {
      setMsgBad("Invalid fields");
    } else {
      reset();
      try {
        const response = await axios.post(
          `http://172.16.61.225:3000/api/sellers`,
          {
            idSeller,
            name,
            email,
            totalCommission,
          }
        );
        setMsgGood("Seller added successfully...");
      } catch (error) {
        setMsgBad(error);
      }
    }
  };

  const editSeller = async (data) => {
    let idSeller = data.idSeller,
      name = data.name,
      email = data.email,
      totalCommission = data.totalCommission;
    if (
      !name.trim() ||
      !email.trim() ||
      !totalCommission.trim() ||
      !idSeller.trim()
    ) {
      setMsgBad("Invalid fields");
    } else {
      reset();
      try {
        const url = `http://172.16.61.225:3000/api/sellers/${data.idSeller}`;
        const response = await axios.put(url, {
          name,
          email,
          totalCommission,
        });
        setMsgGood("Seller updated successfully...");
      } catch (error) {
        setMsgBad(error);
      }
    }
  };

  const deleteSeller = async (data) => {
    let idSeller = data.idSeller,
      name = data.name,
      email = data.email,
      totalCommission = data.totalCommission;
    try {
      if (confirm("Are you sure of delete the seller?")) {
        const url = `http://172.16.61.225:3000/api/sellers/${data.idSeller}`;
        const response = await axios.delete(url, {
          idSeller,
          name,
          email,
          totalCommission,
        });
        setMsgGood("Seller removed successfully...");
        reset();
      }
    } catch (error) {
      setMsgBad(error);
    }
  };

  const handleResult = (data) => {
    return (
      <View style={styles.result}>
        <Text key={data._id} style={styles.text}>
          _Id: {data._id}
        </Text>
        <Text key={data.idSeller} style={styles.text}>
          IdSeller: {data.idSeller}
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

  useEffect(() => {
    setTimeout(() => {
      setMsgBad("");
      setMsgGood("");
    }, 3000);
  }, [msgBad, msgGood]);

  return (
    <View style={styles.container}>
      <View
        style={{
          display: !complete ? "flex" : "none",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Text style={{ color: "green", fontSize: "18px", textAlign: "center" }}>
          {msgGood}
        </Text>
        <Text style={{ color: "red", fontSize: "18px", textAlign: "center" }}>
          {msgBad}
        </Text>
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
                      errors.idSeller?.type == "pattern" ||
                      errors.idSeller?.type == "minLength"
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
          {errors.name?.type == "pattern" && (
            <Text style={{ color: "red" }}>Only letters and spaces</Text>
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
                      errors.totalCommission?.type == "pattern" ||
                      errors.totalCommission?.type == "minLength"
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
            name="totalCommission"
          />
          {errors.totalCommission?.type == "pattern" && (
            <Text style={{ color: "red" }}>Only numbers</Text>
          )}
          {errors.totalCommission?.type == "minLength" && (
            <Text style={{ color: "red" }}>Min 2 characters</Text>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(getSellersId)}
          >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#4E9F3D" }]}
            onPress={handleSubmit(saveSeller)}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#1597BB" }]}
            onPress={handleSubmit(editSeller)}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#FF0000" }]}
            onPress={handleSubmit(deleteSeller)}
          >
            <Text style={styles.buttonText}>Delete</Text>
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
        <Text
          style={{
            color: "green",
            fontSize: "20px",
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          ¡Request made successfully!
        </Text>
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
    marginTop: 30,
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
  result: {
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    color: "#fff",
  },
});

export default SellerComponent;
