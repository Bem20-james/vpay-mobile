import { ActionItem } from "@/components/QuickAction";
import { HistoryItem } from "@/components/Recents/RecentTransactions";
import { OptionItem } from "@/components/BottomSheets/Options";
import { TransferItem } from "@/components/Recents/RecentTransfers";
import { Beneficiaries } from "@/components/Recents/RecentTransfers";
import { AirtimeDataBeneficiaries, AirtimeDataRecents } from "@/components/Recents/AirtimeDataTrnx";
import images from "@/constants/Images";

export const quickActions: ActionItem[] = [
  {
    label: "To Vpay",
    icon: "contactless-payment-circle",
    backgroundColor: "#fff1eb",
    iconColor: "#208DC9",
    route: "/(transfers)/vpay-tag"
  },
  {
    label: "To Bank",
    icon: "bank",
    backgroundColor: "#d2ebf1ff",
    iconColor: "#0a7ea4",
    route: "/(transfers)/local-bank"
  },
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
    subtitle: "98765432 Access Bank",
    icon: "account",
    backgroundColor: "#10B981",
    iconColor: "#FFFFFF",
    amount: "5000",
    timestamp: "2 hours ago"
  },
  {
    label: "GROCERY STORE PAYMENT",
    subtitle: "234567890 MONIEPOINT",
    icon: "store",
    backgroundColor: "#F59E0B",
    iconColor: "#FFFFFF",
    amount: "2500",
    timestamp: "Yesterday"
  },
  {
    label: "JANE DOE PAYMENT",
    subtitle: "234567890 OPAY",
    icon: "store",
    backgroundColor: "#F59E0B",
    iconColor: "#FFFFFF",
    amount: "13500",
    timestamp: "Yesterday"
  },
  {
    label: "ELECTRICITY BILL",
    subtitle: "9876543210 Stanbic ibtc",
    icon: "lightning-bolt",
    backgroundColor: "#EF4444",
    iconColor: "#FFFFFF",
    amount: "8500",
    timestamp: "3 days ago"
  },
  {
    label: "ADVANZTEK",
    subtitle: "0123456789 moniepoint",
    icon: "lightning-bolt",
    backgroundColor: "#EF4444",
    iconColor: "#FFFFFF",
    amount: "8500",
    timestamp: "3 days ago"
  }
];

export const beneficiaries: Beneficiaries[] = [
  {
    label: "NANEES PHARMACY LTD",
    subtitle: "529966729 MONIE POINT",
    icon: "account",
    backgroundColor: "#3B82F6",
    iconColor: "#FFFFFF"
  },
  {
    label: "JAMES AONDOAKURA",
    subtitle: "2032207221 Momo Payment Service Bank",
    icon: "account",
    backgroundColor: "#10B981",
    iconColor: "#FFFFFF"
  },
  {
    label: "SARAH'S BOUTIQUE",
    subtitle: "876543210 First Bank",
    icon: "account",
    backgroundColor: "#8B5CF6",
    iconColor: "#FFFFFF"
  },
  {
    label: "OYE OLAWALE",
    subtitle: "876543210 STANBIC IBTC",
    icon: "account",
    backgroundColor: "#8B5CF6",
    iconColor: "#FFFFFF"
  },
  {
    label: "ADVANZTEK",
    subtitle: "876543210 ACCESS BANK",
    icon: "account",
    backgroundColor: "#8B5CF6",
    iconColor: "#FFFFFF"
  }
];

export const transferOptions: ActionItem[] = [
  {
    label: "Vpay Tag",
    icon: "call-made",
    backgroundColor: "#ffe6f0",
    iconColor: "#ff3d9b",
    route: "/vpay-tag"
  },
  {
    label: "Local Bank",
    icon: "bank-transfer-in",
    backgroundColor: "#ede1ff",
    iconColor: "#9c27b0",
    route: "/local-bank"
  },
  {
    label: "Mobile money",
    icon: "cellphone-dock",
    backgroundColor: "#e0f7f4",
    iconColor: "#00bfa5",
    route: "/mobile-money"
  },
  {
    label: "International",
    icon: "map-check",
    backgroundColor: "#c5e6faff",
    iconColor: "#208BC9",
    route: "/international"
  },
  {
    label: "Cryptocurrency",
    icon: "bitcoin",
    route: "/crypto",
    backgroundColor: "#fff1eb",
    iconColor: "#ff7043"
  }
];

export const countries = [
  {
    id: 1,
    name: "USA",
    countryCode: "US"
  },
  {
    id: 2,
    name: "UK",
    countryCode: "UK"
  },
  {
    id: 3,
    name: "Nigeria",
    countryCode: "NG"
  },
  {
    id: 4,
    name: "South Africa",
    countryCode: "ZA"
  },
  {
    id: 5,
    name: "Kenya",
    countryCode: "KE"
  },
  {
    id: 6,
    name: "Ghana",
    countryCode: "GH"
  },
  {
    id: 7,
    name: "Egypt",
    countryCode: "EG"
  },
  {
    id: 8,
    name: "Morocco",
    countryCode: "MA"
  },
  {
    id: 9,
    name: "Ethiopia",
    countryCode: "ET"
  },
  {
    id: 10,
    name: "Uganda",
    countryCode: "UG"
  },
  {
    id: 11,
    name: "Tanzania",
    countryCode: "TZ"
  },
  {
    id: 12,
    name: "Rwanda",
    countryCode: "RW"
  }
];

export const airtimeDataRecents: AirtimeDataRecents[] = [
  {
    label: "GLO GH",
    phone: "022788951",
    image: images.logolight,
  },
  {
    label: "9MOBILE NG",
    phone: "09033788951",
    image: images.logolight,
  },
  {
    label: "MTN NG",
    phone: "09122879851",
    image: images.logolight,
  },
  {
    label: "AIRTEL NG",
    phone: "07044517951",
    image: images.logolight,
  },
];

export const airtimDataBeneficiaries: AirtimeDataBeneficiaries[] = [
  {
    label: "MTN NG",
    phone: "0917943851",
    image: images.logolight,
  },
  {
    label: "AIRTEL NG",
    phone: "09122879851",
    image: images.logolight,
  },
  {
    label: "GLO GH",
    phone: "122879851",
    image: images.logolight,
  },
  {
    label: "9MOBILE NG",
    phone: "0903879851",
    image: images.logolight,
  },
];
