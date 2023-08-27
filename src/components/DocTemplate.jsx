import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 12,
    padding: 10,
  },
});

const DocTemplateUsers = (data) => {
  const Rows = data.map((user) => (
    <View style={styles.table} key={user.id}>
      <View style={styles.tableRow}>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>{user.name}</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>{user.surname}</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>{user.email}</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>{user.rol}</Text>
        </View>
      </View>
    </View>
  ));
  return Rows;
};

const DocTemplateAttendance = () => {
  const Rows = (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Miriam</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Rodriguez</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>14 asistencias</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>+2 horas</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>09:04 AM</Text>
        </View>
      </View>
    </View>
  );
  return Rows;
};

export { DocTemplateUsers, DocTemplateAttendance };
