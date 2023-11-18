import React from "react";

import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { IDataExample, dataExample } from "../../data/data";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Background } from "../../components/Background";
import { PropsWithNavigator } from "../../types/TypesNavigator";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
      <Background marginTop={hp(1)}>
        <FlatList
          data={dataExample}
          renderItem={({ item }) => (
            <ItemFlatList data={item} onShowMore={onShowMore} />
          )}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <ItemSeparator />}
          style={{
            // backgroundColor: "yellow",
            paddingHorizontal: wp(3),
            paddingTop: hp(1),
            // paddingBottom: hp(30),
            // marginBottom: hp(3),
          }}
          ListFooterComponent={() => (
            <View
              style={{
                // backgroundColor: "red",
                height: hp(5),
              }}
            />
          )}
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
          borderStartWidth: wp(1),
          borderStartColor: "green",
          borderRadius: 5,

          // borderTopWidth: 1,
          // borderTopColor: "green",
        }}
      >
        <View
          style={{
            // backgroundColor: "red",
            marginHorizontal: wp(2),
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
                marginHorizontal: wp(2),
              }}
              name={"person-circle-outline"}
              size={wp(7)}
              color={"white"}
            />
            <Text
              style={{
                fontSize: wp(4),
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
                marginHorizontal: wp(2),
              }}
              name={"body"}
              size={wp(7)}
              color={"white"}
            />
            <Text
              style={{
                fontSize: wp(4),
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
                marginHorizontal: wp(2),
              }}
              name={"leaf"}
              size={wp(7)}
              color={"white"}
            />
            <Text
              style={{
                fontSize: wp(4),
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
                marginHorizontal: wp(2),
              }}
              name={"barbell"}
              size={wp(7)}
              color={"white"}
            />
            <Text
              style={{
                fontSize: wp(4),
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
                marginHorizontal: wp(2),
              }}
              name={"fast-food"}
              size={wp(7)}
              color={"white"}
            />
            <Text
              style={{
                fontSize: wp(4),
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
                fontSize: wp(4),
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
        marginVertical: hp(1),
        borderColor: "white",
      }}
    />
  );
};
