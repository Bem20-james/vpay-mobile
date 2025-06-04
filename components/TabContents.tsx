import React from "react";
import { View } from "react-native";

interface TabContentProps {
  children?: React.ReactNode;
  activeTab: string;
  tabKey: string;
}

const TabContent: React.FC<TabContentProps> = ({
  children,
  activeTab,
  tabKey
}) => {
  return activeTab === tabKey ? <View>{children}</View> : null;
};

export default TabContent;
