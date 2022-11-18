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

function SaleComponent() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      idSeller: "",
      zone: "",
      date: "",
      saleValue: "",
    },
  });

  const [data, setData] = useState([]);
  const [complete, setComplete] = useState(false);
  const [msgGood, setMsgGood] = useState("");
  const [msgBad, setMsgBad] = useState("");
  const [zoneSale, setZone] = useState("North");

  const getSales = async () => {
    try {
      const url = `http://172.16.61.225:3000/api/sales`;
      const response = await axios.get(url);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      setMsgBad(error);
    }
  };

  const getSalesId = async (data) => {
    let idSeller = data.idSeller;
    if (!idSeller.trim()) {
      setMsgBad("Invalid fields");
    } else {
      setComplete(true);
      reset();
      try {
        const url = `http://172.16.61.225:3000/api/sales/${data.idSeller}`;
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setMsgBad(error);
      }
    }
  };

  const saveSales = async (data) => {
    let idSeller = data.idSeller,
      zone = zoneSale,
      date = data.date,
      saleValue = data.saleValue;
    if (!zone.trim() || !date.trim() || !saleValue.trim() || !idSeller.trim()) {
      setMsgBad("Invalid fields");
    } else {
      reset();
      try {
        const response = await axios.post(
          `http://172.16.61.225:3000/api/sales`,
          {
            idSeller,
            zone,
            date,
            saleValue,
          }
        );
        console.log(data);
        setMsgGood("Sale added successfully...");
      } catch (error) {
        setMsgBad(error);
      }
    }
  };

  const editSale = async (data) => {
    let idSeller = data.idSeller,
      zone = zoneSale,
      date = data.date,
      saleValue = data.saleValue;
    if (!zone.trim() || !date.trim() || !saleValue.trim() || !idSeller.trim()) {
      setMsgBad("Invalid fields");
    } else {
      reset();
      try {
        const url = `http://172.16.61.225:3000/api/sales/${data.idSeller}`;
        const response = await axios.put(url, {
          zone,
          date,
          saleValue,
        });
        setMsgGood("Sale updated successfully...");
      } catch (error) {
        setMsgBad(error);
      }
    }
  };

  const deleteSale = async (data) => {
    let idSeller = data.idSeller,
      zone = zoneSale,
      date = data.date,
      saleValue = data.saleValue;
    try {
      if (confirm("Are you sure of delete the sale?")) {
        const url = `http://172.16.61.225:3000/api/sales/${data.idSeller}`;
        const response = await axios.delete(url, {
          idSeller,
          zone,
          date,
          saleValue,
        });
        setMsgGood("Sale removed successfully...");
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
        <Text key={zoneSale} style={styles.text}>
          Zone: {zoneSale}
        </Text>
        <Text key={data.date} style={styles.text}>
          Date: {data.date}
        </Text>
        <Text key={data.saleValue} style={styles.text}>
          Sale Value: {data.saleValue}
        </Text>
      </View>
    );
  };

  useEffect(() => {
    getSales();
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

          <Picker
            selectedValue={zoneSale}
            style={styles.select}
            onValueChange={(itemValue, itemIndex) => setZone(itemValue)}
          >
            <Picker.Item label="North" value="North" />
            <Picker.Item label="South" value="South" />
          </Picker>

          <Controller
            control={control}
            rules={{
              pattern: /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/i,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.inputs,
                  {
                    borderColor:
                      errors.date?.type == "pattern" ? "red" : "#8E05C2",
                  },
                ]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Date"
              />
            )}
            name="date"
          />
          {errors.date?.type == "pattern" && (
            <Text style={{ color: "red" }}>Only date</Text>
          )}
          <Controller
            control={control}
            rules={{
              pattern:
                /^(2[0-9][0-9][0-9][0-9][0-9][0-9]|2[0-9][0-9][0-9][0-9][0-9][0-9][0-9])$/,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.inputs,
                  {
                    borderColor:
                      errors.saleValue?.type == "pattern" ? "red" : "#8E05C2",
                  },
                ]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Sale Value"
              />
            )}
            name="saleValue"
          />
          {errors.saleValue?.type == "pattern" && (
            <Text style={{ color: "red" }}>Only numbers</Text>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(getSalesId)}
          >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#4E9F3D" }]}
            onPress={handleSubmit(saveSales)}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#1597BB" }]}
            onPress={handleSubmit(editSale)}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#FF0000" }]}
            onPress={handleSubmit(deleteSale)}
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
  select: {
    width: "100%",
    height: 35,
    borderColor: "#8E05C2",
    color: "#8E05C2",
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    backgroundColor: "transparent",
  },
});

export default SaleComponent;
