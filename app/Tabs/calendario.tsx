import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function Calendario({ navigation }: { navigation: any }): any {
  const feriados = {
    '2025-01-01': { marked: true, dotColor: '#FF0000', customLabel: 'Confraternização Universal' },
    '2025-04-18': { marked: true, dotColor: '#FF8C00', customLabel: 'Sexta-feira Santa' },
    '2025-04-21': { marked: true, dotColor: '#00BFFF', customLabel: 'Tiradentes' },
    '2025-05-01': { marked: true, dotColor: '#008000', customLabel: 'Dia do Trabalhador' },
    '2025-09-07': { marked: true, dotColor: '#FFD700', customLabel: 'Independência do Brasil' },
    '2025-10-12': { marked: true, dotColor: '#9400D3', customLabel: 'Nossa Senhora Aparecida' },
    '2025-11-02': { marked: true, dotColor: '#A9A9A9', customLabel: 'Finados' },
    '2025-11-15': { marked: true, dotColor: '#1E90FF', customLabel: 'Proclamação da República' },
    '2025-12-25': { marked: true, dotColor: '#FF1493', customLabel: 'Natal' },
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#0055ff" />
        </TouchableOpacity>
        <Text style={styles.title}>Calendário Acadêmico</Text>
        <View style={{ width: 28 }} />
      </View>

      <Calendar
        onDayPress={(day) => console.log('Dia selecionado:', day)}
        markedDates={feriados}
        theme={{
          todayTextColor: '#0055ff',
          arrowColor: '#0055ff',
          dotColor: '#0055ff',
          selectedDayBackgroundColor: '#0055ff',
        }}
      />

      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>📅 Legenda de Feriados</Text>
        {Object.entries(feriados).map(([date, info]) => (
          <View key={date} style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: info.dotColor }]} />
            <Text style={styles.legendText}>
              {info.customLabel} ({date})
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 40 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: { fontSize: 20, fontWeight: '600', color: '#0055ff', textAlign: 'center', flex: 1 },
  legendContainer: { marginTop: 20 },
  legendTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10, color: '#333' },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  dot: { width: 12, height: 12, borderRadius: 6, marginRight: 8 },
  legendText: { fontSize: 14, color: '#555' },
});
