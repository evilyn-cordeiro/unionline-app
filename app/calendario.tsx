import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function Calendario() {
  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => console.log('Dia selecionado:', day)}
        markedDates={{
          '2025-10-30': { marked: true, dotColor: '#0055ff' },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
});
