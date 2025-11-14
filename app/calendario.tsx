import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import feriados from "../data/calendario202502.json";
import { expandDateRanges } from "@/utils/expandRanges";
import { formatDateBR } from "@/utils/date";

LocaleConfig.locales["pt"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ],
  dayNames: [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ],
  dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  today: "Hoje",
};

LocaleConfig.defaultLocale = "pt";

export default function Calendario() {
  const today = new Date();
  const mesAtualInicial = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}`;

  const [currentMonth, setCurrentMonth] = useState(mesAtualInicial);
  const [loading, setLoading] = useState(true);
  const [feriadosMes, setFeriadosMes] = useState<any[]>([]);
  const [markedDates, setMarkedDates] = useState<Record<string, any>>({});
  const [expandir, setExpandir] = useState(false);

  useEffect(() => {
    const carregar = async () => {
      setLoading(true);

      const feriadosExpandidos = expandDateRanges(feriados);

      const filtrados = Object.entries(feriadosExpandidos)
        .filter(([date]) => date.startsWith(currentMonth))
        .sort();

      const marcacoes = filtrados.reduce((acc, [date, info]) => {
        acc[date] = {
          marked: true,
          dotColor: info.dotColor,
          customLabel: info.customLabel,
        };
        return acc;
      }, {} as Record<string, any>);

      setFeriadosMes(filtrados);
      setMarkedDates(marcacoes);

      setTimeout(() => setLoading(false), 300);
    };

    carregar();
  }, [currentMonth]);

  function agruparEventos() {
    const grupos: Record<
      string,
      { start: string; end: string; dotColor: string }
    > = {};

    for (const [date, info] of feriadosMes) {
      const key = info.customLabel;

      if (!grupos[key]) {
        grupos[key] = { start: date, end: date, dotColor: info.dotColor };
      } else {
        grupos[key].end = date;
      }
    }

    return Object.entries(grupos);
  }

  const legendasAgrupadas = agruparEventos();

  const itensVisiveis = expandir ? legendasAgrupadas : legendasAgrupadas.slice(0, 3);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Calendário Acadêmico</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0055ff" style={{ marginTop: 30 }} />
      ) : (
        <Calendar
          markedDates={markedDates}
          monthFormat={"MMMM"}
          onMonthChange={(month) =>
            setCurrentMonth(
              `${month.year}-${String(month.month).padStart(2, "0")}`
            )
          }
        />
      )}

      {!loading && (
        <View style={styles.legendContainer}>
          <Text style={styles.legendTitle}>Legenda de Eventos</Text>

          {itensVisiveis.map(([label, { start, end, dotColor }]) => (
            <View key={label} style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: dotColor }]} />
              <Text style={styles.legendText}>
                {label} —{" "}
                {start === end
                  ? formatDateBR(start)
                  : `${formatDateBR(start)} a ${formatDateBR(end)}`}
              </Text>
            </View>
          ))}

          {legendasAgrupadas.length > 3 && (
            <TouchableOpacity onPress={() => setExpandir(!expandir)}>
              <Text style={styles.toggleButton}>
                {expandir ? "Ver menos" : "Ver mais"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16, marginTop: 50 },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 16 },

  legendContainer: { marginTop: 20, marginBottom: 30 },
  legendTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },

  legendItem: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  dot: { width: 12, height: 12, borderRadius: 6, marginRight: 8 },
  legendText: { fontSize: 14, width: "90%" },

  toggleButton: {
    marginTop: 10,
    color: "#0055ff",
    fontWeight: "600",
    paddingVertical: 6,
    textDecorationLine: "underline",
  },
});
