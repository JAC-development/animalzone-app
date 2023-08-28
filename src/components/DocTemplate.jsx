import { Text, View } from '@react-pdf/renderer';
import { stylesRowUsers, stylesRowAttendance } from 'assets/PDF/pdfstyles';

const DocTemplateUsers = (data) => {
  const Rows = data.map((user) => (
    <View style={stylesRowUsers.table} key={user.id}>
      <View style={stylesRowUsers.tableRow}>
        <View style={stylesRowUsers.tableCol}>
          <Text style={stylesRowUsers.tableCell}>{user.name}</Text>
        </View>
        <View style={stylesRowUsers.tableCol}>
          <Text style={stylesRowUsers.tableCell}>{user.surname}</Text>
        </View>
        <View style={stylesRowUsers.tableCol}>
          <Text style={stylesRowUsers.tableCell}>{user.email}</Text>
        </View>
        <View style={stylesRowUsers.tableCol}>
          <Text style={stylesRowUsers.tableCell}>{user.rol}</Text>
        </View>
      </View>
    </View>
  ));
  return Rows;
};

const DocTemplateAttendance = () => {
  const Rows = (
    <View style={stylesRowAttendance.table}>
      <View style={stylesRowAttendance.tableRow}>
        <View style={stylesRowAttendance.tableCol}>
          <Text style={stylesRowAttendance.tableCell}>Miriam</Text>
        </View>
        <View style={stylesRowAttendance.tableCol}>
          <Text style={stylesRowAttendance.tableCell}>Rodriguez</Text>
        </View>
        <View style={stylesRowAttendance.tableCol}>
          <Text style={stylesRowAttendance.tableCell}>14 asistencias</Text>
        </View>
        <View style={stylesRowAttendance.tableCol}>
          <Text style={stylesRowAttendance.tableCell}>+2 horas</Text>
        </View>
        <View style={stylesRowAttendance.tableCol}>
          <Text style={stylesRowAttendance.tableCell}>09:04 AM</Text>
        </View>
      </View>
    </View>
  );
  return Rows;
};

export { DocTemplateUsers, DocTemplateAttendance };
