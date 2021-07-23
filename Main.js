import * as React from "react";
import { View, StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import {
  Surface,
  Headline,
  Modal,
  Portal,
  Button,
  Provider,
  TextInput,
  RadioButton,
  DataTable,
  IconButton,
} from "react-native-paper";
import ItemList from "./ItemList";

const optionsPerPage = [2, 3, 4];

const Main = () => {
  const [page, setPage] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [checked, setChecked] = React.useState("profit");
  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState();
  const [value, setValue] = React.useState();
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);
  const onSubmit = () => {
    setData([
      ...data,
      {
        id: data.length + 1,
        title: text,
        amount: value * (checked !== "profit" ? -1 : 1),
      },
    ]);
    hideModal();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 100,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Headline
        style={{ textAlign: "center", marginBottom: 50, fontWeight: "800" }}
      >
        EXPENSE TRACKER APP
      </Headline>
      <Surface style={styles.cardParent}>
        <Text style={{ color: "black" }}>
          $
          {data.reduce((accumulator, current) => {
            return accumulator + current.amount;
          }, 0)}
        </Text>
      </Surface>
      <View style={styles.container}>
        <Surface style={styles.card}>
          <Text style={{ color: "blue" }}>
            $
            {data.reduce((accumulator, current) => {
              return current.amount > 0
                ? accumulator + current.amount
                : accumulator;
            }, 0)}
          </Text>
        </Surface>
        <Surface style={styles.card}>
          <Text style={{ color: "red" }}>
            $
            {-1 *
              data.reduce((accumulator, current) => {
                return current.amount < 0
                  ? accumulator + current.amount
                  : accumulator;
              }, 0)}
          </Text>
        </Surface>
      </View>
      <IconButton
        icon="plus-circle"
        style={{ marginTop: 30, textAlign: "center" }}
        onPress={showModal}
      >
        Show
      </IconButton>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title numeric>Type</DataTable.Title>
          <DataTable.Title numeric>Amount</DataTable.Title>
        </DataTable.Header>

        <FlatList
          data={data}
          renderItem={({ item }) => {
            console.log(item);
            return (
              <ItemList id={item.id} title={item.title} amount={item.amount} />
            );
          }}
          keyExtractor={(item) => item.id.toString()}
        />
        <DataTable.Pagination
          page={page}
          numberOfPages={3}
          onPageChange={(page) => setPage(page)}
          label="1-2 of 6"
          optionsPerPage={optionsPerPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          showFastPagination
          optionsLabel={"Rows per page"}
        />
      </DataTable>
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modal}
          >
            <TextInput
              label="Title"
              value={text}
              onChangeText={(text) => setText(text)}
              style={{ marginBottom: 20 }}
            />
            <TextInput
              label="Amount"
              value={value}
              onChangeText={(value) => setValue(value)}
              style={{ marginBottom: 20 }}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <RadioButton
                value="profit"
                status={checked === "profit" ? "checked" : "unchecked"}
                onPress={() => setChecked("profit")}
              />
              <Text>Profit</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <RadioButton
                value="expense"
                status={checked === "expense" ? "checked" : "unchecked"}
                onPress={() => setChecked("expense")}
              />
              <Text>Expense</Text>
            </View>
            <Button
              icon="plus-circle"
              mode="contained"
              disabled={!value || !text}
              onPress={onSubmit}
            >
              Add Transaction
            </Button>
          </Modal>
        </Portal>
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
    backgroundColor: "white",
  },
  cardParent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    width: "100%",
    elevation: 4,
    padding: 8,
    marginBottom: 10,
  },
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    width: "48%",
    elevation: 4,
    padding: 8,
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    height: 350,
  },
});

export default Main;
