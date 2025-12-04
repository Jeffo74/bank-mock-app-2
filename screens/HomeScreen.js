import {
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import AccountCard from "../components/AccountCard";
import sampleData from "../data/sampleData";
import { formatCurrency } from "../utils/format";

export default function HomeScreen({ navigation }) {
  const accounts = sampleData.accounts;
  const total = accounts.reduce(
    (sum, a) =>
      sum +
      (a.initialBalance + a.transactions.reduce((s, t) => s + t.amount, 0)),
    0
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning</Text>
          <Text style={styles.name}>MATTHEW</Text>
        </View>
        <Text style={styles.total}>{formatCurrency(total)}</Text>
      </View>

      <View style={styles.actionsRow}>
        <View style={styles.pill}>
          <Text style={styles.pillText}>Interac e-Transfer</Text>
        </View>
        <View style={styles.pill}>
          <Text style={styles.pillText}>Transfer</Text>
        </View>
        <View style={styles.pill}>
          <Text style={styles.pillText}>Pay</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>My Accounts</Text>

      <FlatList
        data={accounts}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Account", { accountId: item.id })
            }
          >
            <AccountCard account={item} />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff", paddingHorizontal: 16 },
  header: {
    paddingTop: 20,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: { color: "#2c2c2c", fontSize: 18 },
  name: { color: "#2c2c2c", fontSize: 28, fontWeight: "700" },
  total: { color: "#0a7a12", fontWeight: "700", fontSize: 20 },
  sectionTitle: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  pill: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  pillText: { color: "#0a7a12", fontWeight: "600" },
});
