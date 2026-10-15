import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import LogoutButton from "../components/Logout";
import { useAuthStore } from "../context/Auth";

// design-system.md §1.2/1.3 — Header sobre `surface`, sin hex inventados.

const HeaderSafe = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.colors.surface};
`;

const HeaderBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.medium}px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 18px;
  font-weight: 700;
`;

const Profile = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Avatar = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.actionPrimary};
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;

const AvatarText = styled.Text`
  color: ${({ theme }) => theme.colors.onAction};
  font-weight: 700;
`;

const Info = styled.View`
  margin-right: 12px;
`;

const Name = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
`;

const Role = styled.Text`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
`;

export default function Header() {
  const user = useAuthStore((state) => state.user);

  const displayName = user?.name
    ? `${user.name}${user.lastName ? " " + user.lastName : ""}`
    : "Invitado";

  const initials =
    user?.name && user.name.trim() !== ""
      ? user.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "??";

  return (
    <HeaderSafe edges={["top"]}>
      <HeaderBar>
        <Title>Psicólogos UI</Title>

        <Profile>
          <Avatar>
            <AvatarText>{initials}</AvatarText>
          </Avatar>
          <Info>
            <Name>{displayName}</Name>
            <Role>{user?.role ?? "Sin rol"}</Role>
          </Info>
          {user && <LogoutButton />}
        </Profile>
      </HeaderBar>
    </HeaderSafe>
  );
}
