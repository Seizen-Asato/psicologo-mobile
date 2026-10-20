import DashboardScreen from "@/screen/DashBoardScreen";
import styled from "styled-components/native";

const Screen = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.background};
`;

export default function DashBoard() {
  return (
    <Screen contentContainerStyle={{ paddingBottom: 24 }}>
      <DashboardScreen />
    </Screen>
  );
}
