import React from "react";

import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { IDataExample, dataExample } from "../../data/data";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Background } from "../../components/Background";
import { PropsWithNavigator } from "../../types/TypesNavigator";

export interface ItemFlatListType {
  data: {
    name: string;
    peso: string;
    mide: string;
  };

  onShowMore: () => void;
}

export const ListaClientesScreen = ({
  navigation,
  route,
}: PropsWithNavigator) => {
  const onShowMore = () => {
    navigation.navigate("DetallesScreen");
  };

  return (
    <>
      <Background marginTop={1}>
        <FlatList
          data={dataExample}
          renderItem={({ item }) => (
            <ItemFlatList data={item} onShowMore={onShowMore} />
          )}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <ItemSeparator />}
          style={{
            // backgroundColor: "yellow",
            paddingHorizontal: 10,
            paddingTop: 20,
          }}
          // ListHeaderComponent={() => <HeaderTitle title="Opciones de Menu" />} //* Para ponerle un "Header"
        />
      </Background>
    </>
  );
};

const ItemFlatList = ({ data, onShowMore }: ItemFlatListType) => {
  return (
    <>
      <View
        style={{
          // backgroundColor: "green",
          justifyContent: "space-between",
          flexDirection: "row",
          borderStartWidth: 5,
          borderStartColor: "green",
          borderRadius: 5,

          // borderTopWidth: 1,
          // borderTopColor: "green",
        }}
      >
        <View
          style={{
            // backgroundColor: "red",
            marginHorizontal: 10,
          }}
        >
          <View
            style={{
              // backgroundColor: "gray",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              style={{
                marginHorizontal: 5,
              }}
              name={"person-circle-outline"}
              size={30}
              color={"white"}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                color: "white",
              }}
            >
              Nombre: {data.name}
            </Text>
          </View>

          <View
            style={{
              // backgroundColor: "gray",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              style={{
                marginHorizontal: 5,
              }}
              name={"body"}
              size={30}
              color={"white"}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                color: "white",
              }}
            >
              Estatura: {data.mide}
            </Text>
          </View>

          <View
            style={{
              // backgroundColor: "gray",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              style={{
                marginHorizontal: 5,
              }}
              name={"leaf"}
              size={30}
              color={"white"}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                color: "white",
              }}
            >
              Peso: {data.peso}
            </Text>
          </View>

          <View
            style={{
              // backgroundColor: "gray",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              style={{
                marginHorizontal: 5,
              }}
              name={"barbell"}
              size={30}
              color={"white"}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                color: "white",
              }}
            >
              Niv. Masa: {data.peso}
            </Text>
          </View>

          <View
            style={{
              // backgroundColor: "gray",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              style={{
                marginHorizontal: 5,
              }}
              name={"fast-food"}
              size={30}
              color={"white"}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                color: "white",
              }}
            >
              Niv. Grasa: {data.peso}
            </Text>
          </View>
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={onShowMore}>
            <Text
              style={{
                color: "white",
              }}
            >
              Ver mas...
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const ItemSeparator = () => {
  return (
    <View
      style={{
        // backgroundColor: "white",
        borderBottomWidth: 1,
        opacity: 0.2,
        marginVertical: 10,

        borderColor: "white",
      }}
    />
  );
};
