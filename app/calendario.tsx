import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import feriados from "../data/calendario202502.json";

LocaleConfig.locales["pt"] = {
  monthNames: [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ],
  monthNamesShort: [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ],
  dayNames: [
    "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
    "Quinta-feira", "Sexta-feira", "Sábado"
  ],
  dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  today: "Hoje"
};
LocaleConfig.defaultLocale = "pt";

const expandDateRanges = (events: Record<string, any>) => {
  const result: Record<string, any> = {};
  Object.entries(events).forEach(([key, value]) => {
    if (key.includes(" a ")) {
      const [start, end] = key.split(" a ").map(d => d.trim());
      let current = new Date(start);
      const last = new Date(end);
      while (current <= last) {
        const dateStr = current.toISOString().split("T")[0];
        result[dateStr] = value;
        current.setDate(current.getDate() + 1);
      }
    } else {
      result[key] = value;
    }
  });
  return result;
};

export default function Calendario({ navigation }: { navigation: any }) {
  const [currentMonth, setCurrentMonth] = useState("2025-07");
  const feriadosExpandido = expandDateRanges(feriados);
  const feriadosDoMes = Object.entries(feriadosExpandido).filter(([date]) =>
    date.startsWith(currentMonth)
  );

  const markedDates = feriadosDoMes.reduce((acc, [date, info]) => {
    acc[date] = {
      marked: true,
      dotColor: info.dotColor,
      customLabel: info.customLabel
    };
    return acc;
  }, {} as Record<string, any>);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#0055ff" />
        </TouchableOpacity>
        <Text style={styles.title}>Calendário Acadêmico</Text>
        <View style={{ width: 28 }} />
      </View>

      <Calendar
        onDayPress={(day) => console.log("Dia selecionado:", day)}
        markedDates={markedDates}
        onMonthChange={(month) =>
          setCurrentMonth(`${month.year}-${month.month.toString().padStart(2, "0")}`)
        }
        monthFormat={"MMMM yyyy"}
        theme={{
          todayTextColor: "#0055ff",
          arrowColor: "#0055ff",
          dotColor: "#0055ff",
          selectedDayBackgroundColor: "#0055ff",
        }}
      />

      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>📅 Legenda de Eventos</Text>
        {feriadosDoMes.map(([date, info]) => (
          <View key={date} style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: info.dotColor }]} />
            <Text style={styles.legendText}>
              {info.customLabel} ({date})
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0055ff",
    textAlign: "center",
    flex: 1,
  },
  legendContainer: { marginTop: 20 },
  legendTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  legendItem: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  dot: { width: 12, height: 12, borderRadius: 6, marginRight: 8 },
  legendText: { fontSize: 14, color: "#555" },
});
