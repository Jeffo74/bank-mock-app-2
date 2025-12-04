import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import TransactionItem from "../components/TransactionItem";
import sampleData from "../data/sampleData";
import { formatCurrency } from "../utils/format";

export default function AccountScreen({ route, navigation }) {
  const { accountId } = route.params;
  const account = sampleData.accounts.find((a) => a.id === accountId);
  if (!account) return null;

  // compute running balances (chronological oldest -> newest)
  const sorted = [...account.transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  let running = account.initialBalance;
  const withRunning = sorted
    .map((tx) => {
      running = running + tx.amount;
      return { ...tx, runningBalance: running };
    })
    .reverse(); // newest first

  const accountBalance =
    account.initialBalance +
    account.transactions.reduce((s, t) => s + t.amount, 0);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back}
        >
          <Text style={{ color: "#0a7a12" }}>{"< Back"}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Banking</Text>
        <View style={{ width: 60 }} />
      </View>

      <Text style={styles.accNumber}>{account.number}</Text>
      <Text style={styles.accName}>{account.name}</Text>
      <Text style={styles.balance}>{formatCurrency(accountBalance)}</Text>

      <View style={styles.actionRow}>
        <View style={styles.actionPill}>
          <Text style={{ color: "#0a7a12" }}>Interac e-Transfer</Text>
        </View>
        <View style={styles.actionPill}>
          <Text style={{ color: "#0a7a12" }}>Transfer</Text>
        </View>
        <View style={styles.actionPill}>
          <Text style={{ color: "#0a7a12" }}>Pay Bills</Text>
        </View>
      </View>

      <View style={{ marginTop: 14 }}>
        <View style={styles.tabRow}>
          <Text style={[styles.tab, styles.tabActive]}>Activity</Text>
          <Text style={styles.tab}>Details</Text>
          <Text style={styles.tab}>Manage</Text>
        </View>

        <Text style={styles.sectionTitle}>Transactions</Text>

        <FlatList
          data={withRunning}
          keyExtractor={(t) => t.id}
          renderItem={({ item }) => <TransactionItem tx={item} />}
          ListEmptyComponent={
            <View style={styles.emptyCard}>
              <Text style={{ fontWeight: "700", marginBottom: 6 }}>
                No Account Activity
              </Text>
              <Text style={{ color: "#666" }}>
                Once you start making transactions in your account, you can view
                a detailed list of your activity here.
              </Text>
            </View>
          }
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  back: { width: 60 },
  title: { fontSize: 18, fontWeight: "700" },
  accNumber: { color: "#777", marginTop: 12 },
  accName: { fontSize: 20, fontWeight: "700", marginTop: 4 },
  balance: { fontSize: 36, fontWeight: "800", marginTop: 6 },
  actionRow: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between",
  },
  actionPill: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  tabRow: {
    flexDirection: "row",
    marginTop: 18,
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingBottom: 8,
  },
  tab: { marginRight: 20, color: "#777" },
  tabActive: { color: "#0a7a12", fontWeight: "700" },
  sectionTitle: { fontSize: 20, fontWeight: "700", marginVertical: 12 },
  emptyCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
});
