import * as React from "react";
import { DataTable, IconButton, Colors } from "react-native-paper";

const ItemList = ({ id, title, amount }) => {
  return (
    <DataTable.Row>
      <DataTable.Cell>{title}</DataTable.Cell>
      <DataTable.Cell numeric>
        {amount > 0 ? (
          <IconButton icon="arrow-up-thick" color={Colors.blue} size={20} />
        ) : (
          <IconButton icon="arrow-down-thick" color={Colors.red} size={20} />
        )}
      </DataTable.Cell>
      <DataTable.Cell numeric>${amount}</DataTable.Cell>
    </DataTable.Row>
  );
};

export default ItemList;
