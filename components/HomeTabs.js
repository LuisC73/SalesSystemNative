import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import SaleComponent from "./SaleComponent";
import SellerComponent from "./SellerComponent";

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Seller"
        component={SellerComponent}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-circle-outline"
              color={"#8E05C2"}
              size={20}
            ></Ionicons>
          ),
        }}
      />
      <Tab.Screen
        name="Sale"
        component={SaleComponent}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="cart-outline"
              color={"#8E05C2"}
              size={20}
            ></Ionicons>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeTabs;
