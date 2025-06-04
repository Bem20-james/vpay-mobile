import { ActionItem } from "@/components/QuickAction";
import { HistoryItem } from "@/components/RecentTransactions";
import { OptionItem } from "@/components/BottomSheets/options";
import { TransferItem } from "@/components/RecentTransfers";

export const quickActions: ActionItem[] = [
  {
    label: "Airtime",
    icon: "phone",
    backgroundColor: "#ffe6f0",
    iconColor: "#ff3d9b",
    route: "/(actions)/airtime"
  },
  {
    label: "Mobile data",
    icon: "web",
    backgroundColor: "#ede1ff",
    iconColor: "#9c27b0",
    route: "/(actions)/mobile-data"
  },
  {
    label: "Pay bills",
    icon: "wallet",
    backgroundColor: "#e0f7f4",
    iconColor: "#00bfa5"
  },
  {
    label: "Betting",
    icon: "minus-circle",
    backgroundColor: "#fff1eb",
    iconColor: "#ff7043",
    route: "/(actions)/betting"
  }
];

export const trnxHistory: HistoryItem[] = [
  {
    id: "1",
    label: "Purchase Airtime",
    icon: "phone",
    backgroundColor: "#ffe6f0",
    iconColor: "#ff3d9b",
    amount: "100",
    timestamp: "May 1st, 10:03:38"
  },
  {
    id: "2",
    label: "Mobile data",
    icon: "web",
    backgroundColor: "#ede1ff",
    iconColor: "#9c27b0",
    amount: "9500",
    timestamp: "May 20th, 08:03:38"
  },
  {
    id: "3",
    label: "Electric bills",
    icon: "wallet",
    backgroundColor: "#e0f7f4",
    iconColor: "#00bfa5",
    amount: "5000",
    timestamp: "Today 9:45am"
  },
  {
    id: "4",
    label: "Betting",
    icon: "minus-circle",
    backgroundColor: "#fff1eb",
    iconColor: "#ff7043",
    amount: "200",
    timestamp: "Yesterday 10:00pm"
  }
];

export const trnxHistory2: HistoryItem[] = [
  {
    id: "1",
    label: "Purchase Airtime",
    icon: "phone",
    backgroundColor: "#ffe6f0",
    iconColor: "#ff3d9b",
    amount: "100",
    timestamp: "May 1st, 10:03:38"
  },
  {
    id: "2",
    label: "Mobile data",
    icon: "web",
    backgroundColor: "#ede1ff",
    iconColor: "#9c27b0",
    amount: "9500",
    timestamp: "May 20th, 08:03:38"
  },
  {
    id: "3",
    label: "Purchase Airtime",
    icon: "phone",
    backgroundColor: "#ffe6f0",
    iconColor: "#ff3d9b",
    amount: "100",
    timestamp: "May 1st, 10:03:38"
  },
  {
    id: "4",
    label: "Mobile data",
    icon: "web",
    backgroundColor: "#ede1ff",
    iconColor: "#9c27b0",
    amount: "9500",
    timestamp: "May 20th, 08:03:38"
  },
  {
    id: "5",
    label: "Electric bills",
    icon: "wallet",
    backgroundColor: "#e0f7f4",
    iconColor: "#00bfa5",
    amount: "5000",
    timestamp: "Today 9:45am"
  },
  {
    id: "6",
    label: "Betting",
    icon: "minus-circle",
    backgroundColor: "#fff1eb",
    iconColor: "#ff7043",
    amount: "200",
    timestamp: "Yesterday 10:00pm"
  },
  {
    id: "7",
    label: "Electric bills",
    icon: "wallet",
    backgroundColor: "#e0f7f4",
    iconColor: "#00bfa5",
    amount: "5000",
    timestamp: "Today 9:45am"
  },
  {
    id: "8",
    label: "Betting",
    icon: "minus-circle",
    backgroundColor: "#fff1eb",
    iconColor: "#ff7043",
    amount: "200",
    timestamp: "Yesterday 10:00pm"
  },
  {
    id: "9",
    label: "Incoming Transfer",
    icon: "arrow-bottom-right",
    backgroundColor: "#ede1ff",
    iconColor: "#9c27b0",
    amount: "9500",
    timestamp: "May 20th, 08:03:38"
  }
];

export const notifications = [
  {
    label: "Debit Alert",
    status: "New",
    message: "lorem ipsum dolor sit amet, consectetur adipiscing elit",
    timestamp: "May 1st, 10:03am"
  },
  {
    label: "Valentine's Day",
    status: "New",
    message:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet consectetur",
    timestamp: "May 20th, 08:38am"
  },
  {
    label: "Card Maintenance",
    status: "Read",
    message: "lorem ipsum dolor sit amet, consectetur adipiscing elit",
    timestamp: "July 8th, 9:45am"
  },
  {
    label: "Credit Alert",
    status: "Read",
    message: "lorem ipsum dolor sit amet, consectetur adipiscing elit",
    timestamp: "August 20th, 10:00pm"
  }
];

export const currencies = [
  {
    label: "Naira (NGN)",
    amount: "23,000",
    flag: "NG"
  },
  {
    label: "US Dollar (USD)",
    amount: "3,000",
    flag: "US"
  },
  {
    label: "USDT (USDT)",
    amount: "1,000",
    flag: "USDT"
  }
];

export const billOptions: OptionItem[] = [
  {
    label: "Cable TV",
    icon: "television",
    iconColor: "#1E88E5",
    iconBg: "#E6F0FA",
    chevron: true,
    route: "/(actions)/cable-tv"
  },
  {
    label: "Electricity",
    icon: "flash",
    iconColor: "#1E88E5",
    iconBg: "#E6F0FA",
    chevron: true,
    route: "/(actions)/electricity"
  }
];

export const recentActions: TransferItem[] = [
  {
    label: "JOHN DOE TRANSFER",
    subtitle: "#98765432 Access Bank",
    icon: "account",
    backgroundColor: "#10B981",
    iconColor: "#FFFFFF",
    amount: "5000",
    timestamp: "2 hours ago"
  },
  {
    label: "GROCERY STORE PAYMENT",
    subtitle: "234567890 MONIE POINT",
    icon: "store",
    backgroundColor: "#F59E0B",
    iconColor: "#FFFFFF",
    amount: "2500",
    timestamp: "Yesterday"
  },
  {
    label: "ELECTRICITY BILL",
    subtitle: "AEDC Payment",
    icon: "lightning-bolt",
    backgroundColor: "#EF4444",
    iconColor: "#FFFFFF",
    amount: "8500",
    timestamp: "3 days ago"
  }
];

export const beneficiaries: TransferItem[] = [
  {
    label: "NANEES PHARMACY LTD",
    subtitle: "529966729 MONIE POINT",
    icon: "account",
    backgroundColor: "#3B82F6",
    iconColor: "#FFFFFF",
    amount: "",
    timestamp: ""
  },
  {
    label: "JAMES AONDOAKURA",
    subtitle: "2032207221 Momo Payment Service Bank",
    icon: "account",
    backgroundColor: "#10B981",
    iconColor: "#FFFFFF",
    amount: "",
    timestamp: ""
  },
  {
    label: "SARAH'S BOUTIQUE",
    subtitle: "876543210 First Bank",
    icon: "account",
    backgroundColor: "#8B5CF6",
    iconColor: "#FFFFFF",
    amount: "",
    timestamp: ""
  }
];