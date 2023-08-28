'use client';
import { Text, View } from '@react-pdf/renderer';
import { stylesRowUsers, stylesRowAttendance, stylesRowUserHistory } from 'assets/PDF/pdfstyles';

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

const DocTemplateAttendance = (data) => {
  const getHours = (docDdate) => {
    const date = new Date(docDdate);
    const hours = date.getHours();
    const hours12 = hours % 12 || 12;
    const minutes = date.getMinutes();
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const refFullHour = `${hours12}:${formattedMinutes}`;
    return refFullHour;
  };

  const getTime = (docDdate) => {
    const date = new Date(docDdate);
    const hours = date.getHours();
    const refTime = hours >= 12 ? 'PM' : 'AM';

    return refTime;
  };
  const Rows = data.map((user) => (
    <View style={stylesRowAttendance.table} key={user.id}>
      <View style={stylesRowAttendance.tableRow}>
        <View style={stylesRowAttendance.tableCol}>
          <Text style={stylesRowAttendance.tableCell}>{user.user}</Text>
        </View>
        <View style={stylesRowAttendance.tableCol}>
          <Text style={stylesRowAttendance.tableCell}>Asistencia</Text>
        </View>
        <View style={stylesRowAttendance.tableCol}>
          <Text style={stylesRowAttendance.tableCell}>{user.status}</Text>
        </View>
        <View style={stylesRowAttendance.tableCol}>
          <Text style={stylesRowAttendance.tableCell}>
            {new Date(user.date.seconds * 1000).getDate()}/{new Date(user.date.seconds * 1000).getMonth()}/{new Date(user.date.seconds * 1000).getFullYear()}
          </Text>
        </View>
        <View style={stylesRowUserHistory.tableCol}>
          <Text style={stylesRowUserHistory.tableCell}>
            {getHours(user.date.seconds * 1000)} {getTime(user.date.seconds * 1000)}
          </Text>
        </View>
      </View>
    </View>
  ));
  return Rows;
};

const DocTemplateUserHistory = (data) => {
  const getHours = (docDdate) => {
    const date = new Date(docDdate);
    const hours = date.getHours();
    const hours12 = hours % 12 || 12;
    const minutes = date.getMinutes();
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const refFullHour = `${hours12}:${formattedMinutes}`;
    return refFullHour;
  };

  const getTime = (docDdate) => {
    const date = new Date(docDdate);
    const hours = date.getHours();
    const refTime = hours >= 12 ? 'PM' : 'AM';

    return refTime;
  };
  const Rows = data.map((user) => (
    <View style={stylesRowUserHistory.table} key={user.id}>
      <View style={stylesRowUserHistory.tableRow}>
        <View style={stylesRowUserHistory.tableCol}>
          <Text style={stylesRowUserHistory.tableCell}>{user.user}</Text>
        </View>
        <View style={stylesRowUserHistory.tableCol}>
          <Text style={stylesRowUserHistory.tableCell}>Asistencia</Text>
        </View>
        <View style={stylesRowUserHistory.tableCol}>
          <Text style={stylesRowUserHistory.tableCell}>{user.status}</Text>
        </View>
        <View style={stylesRowUserHistory.tableCol}>
          <Text style={stylesRowUserHistory.tableCell}>
            {new Date(user.date.seconds * 1000).getDate()}/{new Date(user.date.seconds * 1000).getMonth()}/{new Date(user.date.seconds * 1000).getFullYear()}
          </Text>
        </View>
        <View style={stylesRowUserHistory.tableCol}>
          <Text style={stylesRowUserHistory.tableCell}>
            {getHours(user.date.seconds * 1000)} {getTime(user.date.seconds * 1000)}
          </Text>
        </View>
      </View>
    </View>
  ));
  return Rows;
};

export { DocTemplateUsers, DocTemplateAttendance, DocTemplateUserHistory };
