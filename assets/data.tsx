import { ActionItem } from "@/components/QuickAction";
import { HistoryItem } from "@/components/Recents/RecentTransactions";
import { OptionItem } from "@/components/BottomSheets/Options";
import { TransferItem } from "@/components/Recents/RecentTransfers";
import { Beneficiaries } from "@/components/Recents/RecentTransfers";
import images from "@/constants/Images";
import { ContactItem } from "@/components/Recents/AirtimeDataTrnx";
import { Dimensions } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { TierData } from "@/app/transaction-limit";

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

export const airtimeDataRecents: ContactItem[] = [
  {
    label: "GLO GH",
    identifier: "022788951",
    image: images.logodark
  },
  {
    label: "9MOBILE NG",
    identifier: "09033788951",
    image: images.logodark
  },
  {
    label: "MTN NG",
    identifier: "09122879851",
    image: images.logodark
  },
  {
    label: "AIRTEL NG",
    identifier: "07044517951",
    image: images.logodark
  },
  {
    label: "AIRTEL NG",
    identifier: "07044517951",
    image: images.logodark
  }
];

export const airtimDataBeneficiaries: ContactItem[] = [
  {
    label: "MTN NG",
    identifier: "0917943851",
    image: images.logodark
  },
  {
    label: "AIRTEL NG",
    identifier: "09122879851",
    image: images.logodark
  },
  {
    label: "GLO GH",
    identifier: "122879851",
    image: images.logodark
  },
  {
    label: "AIRTEL NG",
    identifier: "07044517951",
    image: images.logodark
  },
  {
    label: "9MOBILE NG",
    identifier: "0903879851",
    image: images.logodark
  }
];

export const { width: SCREEN_WIDTH } = Dimensions.get("window");
export const CARD_WIDTH = SCREEN_WIDTH - 40;
export const CARD_SPACING = 20;

export const cards = [
  {
    id: "ngn",
    name: "NGN card",
    cardColor: Colors.light.primaryDark1,
    accentColor: "#208BC9",
    subtitle: "Built for Your Digital Life",
    currency: "NGN",
    features: [
      {
        icon: <Entypo name="globe" size={20} color="#208bc9" />,
        title: "Shop Globally",
        description:
          "Use your Vpay Card for online purchases anywhere Visa cards are accepted"
      },
      {
        icon: <MaterialIcons name="security" size={20} color="#208bc9" />,
        title: "Verified & Secure",
        description:
          "Your Vpay Card comes with advanced security features to protect your transactions and personal information."
      }
    ],
    fees: [
      "NGN 1000 non-refundable card creation fee",
      "NGN 50 non-refundable quarterly card maintenance fee"
    ]
  },
  {
    id: "usd",
    name: "USD card",
    cardColor: Colors.light.primaryDark1,
    accentColor: "#208BC9",
    subtitle: "Built for Your Digital Life",
    currency: "USD",
    features: [
      {
        icon: <Entypo name="globe" size={20} color="#208bc9" />,
        title: "Shop Globally",
        description:
          "Use your Vpay Card for online purchases anywhere Visa cards are accepted"
      },
      {
        icon: <MaterialIcons name="security" size={20} color="#208bc9" />,
        title: "Verified & Secure",
        description:
          "Your Vpay Card comes with advanced security features to protect your transactions and personal information."
      }
    ],
    fees: [
      "USD 2 non-refundable card creation fee",
      "USD 1 non-refundable quarterly card maintenance fee"
    ]
  }
];

export const tierData: TierData[] = [
  {
    tier: "Tier 1",
    dailyLimit: "₦50,000",
    accountBalance: "₦300,000",
    isCurrent: false
  },
  {
    tier: "Tier 2",
    dailyLimit: "₦200,000",
    accountBalance: "₦500,000",
    isCurrent: false
  },
  {
    tier: "Tier 3",
    dailyLimit: "₦5,000,000",
    accountBalance: "Unlimited",
    isCurrent: true
  }
];
