import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
